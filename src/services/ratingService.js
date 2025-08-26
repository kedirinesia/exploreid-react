import axios from 'axios';
import { RATING_URLS } from '../config/apiConfig';

class RatingService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30000; // 30 seconds cache
    this.pendingRequests = new Map();
  }

  // Helper method to get cache key
  getCacheKey(url, data = null) {
    return `${url}_${data ? JSON.stringify(data) : 'GET'}`;
  }

  // Helper method to check if cache is valid
  isCacheValid(timestamp) {
    return Date.now() - timestamp < this.cacheTimeout;
  }
  // Helper method to make requests to Google Apps Script
  async makeGoogleScriptRequest(url, data = null, method = 'GET') {
    console.log(`🔗 Rating API Request: ${method} ${url}`, data);
    
    // Check cache for GET requests
    if (method === 'GET') {
      const cacheKey = this.getCacheKey(url);
      const cached = this.cache.get(cacheKey);
      
      if (cached && this.isCacheValid(cached.timestamp)) {
        console.log('📦 Using cached response');
        return cached.response;
      }
      
      // Check if request is already pending
      if (this.pendingRequests.has(cacheKey)) {
        console.log('⏳ Request already pending, waiting...');
        return await this.pendingRequests.get(cacheKey);
      }
    }
    
    // Use CORS proxy for development to bypass CORS issues
    let targetUrl = url;
    let useProxy = false;
    
    // Always use proxy in development, or if direct call fails
    const localProxy = 'http://localhost:3001/proxy/';
    const externalProxies = [
      'https://api.allorigins.win/get?url=',
      'https://cors.bridged.cc/',
      'https://thingproxy.freeboard.io/fetch/',
      'https://corsproxy.io/?'
    ];
    
    // Try local proxy first if available
    if (process.env.NODE_ENV === 'development') {
      targetUrl = `${localProxy}${url}`;
      useProxy = true;
    }
    
    // Create promise for pending request tracking
    const cacheKey = this.getCacheKey(url, data);
    const requestPromise = this.executeRequest(targetUrl, data, method, useProxy, externalProxies, url);
    
    // Track pending request for GET requests
    if (method === 'GET') {
      this.pendingRequests.set(cacheKey, requestPromise);
    }
    
    try {
      const response = await requestPromise;
      
      // Cache successful GET responses
      if (method === 'GET') {
        this.cache.set(cacheKey, {
          response: response,
          timestamp: Date.now()
        });
      }
      
      return response;
    } finally {
      // Clean up pending request
      if (method === 'GET') {
        this.pendingRequests.delete(cacheKey);
      }
    }
  }

  // Execute the actual request
  async executeRequest(targetUrl, data, method, useProxy, externalProxies, originalUrl) {
    try {
      if (method === 'POST') {
        console.log('🔗 Making POST request to rating API...');
        const response = await axios.post(targetUrl, data, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 15000,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
        });
        return response;
      } else {
        console.log('🔗 Making GET request to rating API...');
        const response = await axios.get(targetUrl, {
          timeout: 15000,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
        });
        return response;
      }
    } catch (error) {
      console.error('Rating API Request error:', error);
      
      // If local proxy fails, try external proxies
      if (useProxy) {
        console.log('🔄 Local proxy failed, trying external proxies...');
        return await this.tryExternalProxies(originalUrl, data, method, externalProxies);
      }
      
      // If direct call fails, try with proxies
      console.log('🔄 Direct call failed, trying with proxies...');
      return await this.tryExternalProxies(originalUrl, data, method, externalProxies);
    }
  }

  // Try external proxies if the first one fails
  async tryExternalProxies(originalUrl, data, method, externalProxies) {
    for (const proxy of externalProxies) {
      try {
        const proxyUrl = `${proxy}${encodeURIComponent(originalUrl)}`;
        console.log(`🔄 Trying proxy: ${proxy}`);
        
        if (method === 'POST') {
          const response = await axios.post(proxyUrl, data, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            timeout: 15000
          });
          
          // Handle different proxy response formats
          if (response.data.contents) {
            // allorigins format
            response.data = JSON.parse(response.data.contents);
          }
          return response;
        } else {
          const response = await axios.get(proxyUrl, {
            timeout: 15000
          });
          
          // Handle different proxy response formats
          if (response.data.contents) {
            // allorigins format
            response.data = JSON.parse(response.data.contents);
          }
          return response;
        }
      } catch (proxyError) {
        console.log(`❌ Proxy ${proxy} failed:`, proxyError.message);
        continue;
      }
    }
    
    throw new Error('All proxy servers failed. Please check your internet connection.');
  }

  // Clear cache for rating-related requests
  clearRatingCache() {
    console.log('🗑️ Clearing rating cache...');
    this.cache.clear();
    this.pendingRequests.clear();
  }

  // Force refresh ratings (bypass cache)
  async forceRefreshRatings() {
    console.log('🔄 Force refreshing ratings...');
    this.clearRatingCache();
    return await this.getRatings();
  }

  // Submit a new rating
  async submitRating(userId, productId, rating, review) {
    try {
      const requestData = {
        action: "SUBMIT_RATING",
        userId: parseInt(userId),
        productId: parseInt(productId),
        rating: parseInt(rating),
        review: review
      };

      const response = await this.makeGoogleScriptRequest(
        RATING_URLS.SUBMIT_RATING,
        requestData,
        'POST'
      );

      if (response.data && response.data.status === 'success') {
        // Clear cache after successful submission
        this.clearRatingCache();
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data?.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  }

  // Get all ratings
  async getRatings() {
    try {
      const response = await this.makeGoogleScriptRequest(
        RATING_URLS.GET_RATINGS,
        null,
        'GET'
      );

      if (response.data && response.data.status === 'success') {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data?.message || 'Failed to fetch ratings');
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
      throw error;
    }
  }

  // Get ratings for a specific product
  async getRatingsByProduct(productId) {
    try {
      console.log(`🔍 Getting ratings for product ${productId}...`);
      const allRatings = await this.getRatings();
      
      if (allRatings.success) {
        const productRatings = allRatings.data.filter(
          rating => rating.productId === parseInt(productId)
        );
        
        console.log(`🔍 Product ${productId} found ${productRatings.length} ratings:`, productRatings);
        
        return {
          success: true,
          data: productRatings,
          message: 'Ratings fetched successfully'
        };
      }
      
      console.log(`🔍 Failed to get all ratings for product ${productId}`);
      return allRatings;
    } catch (error) {
      console.error(`🔍 Error fetching ratings by product ${productId}:`, error);
      throw error;
    }
  }

  // Update an existing rating
  async updateRating(ratingId, rating, review) {
    try {
      const requestData = {
        action: "UPDATE_RATING",
        id: parseInt(ratingId),
        rating: parseInt(rating),
        review: review
      };

      const response = await this.makeGoogleScriptRequest(
        RATING_URLS.UPDATE_RATING,
        requestData,
        'POST'
      );

      if (response.data && response.data.status === 'success') {
        // Clear cache after successful update
        this.clearRatingCache();
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data?.message || 'Failed to update rating');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
      throw error;
    }
  }

  // Delete a rating
  async deleteRating(ratingId) {
    try {
      const requestData = {
        action: "DELETE_RATING",
        id: parseInt(ratingId)
      };

      const response = await this.makeGoogleScriptRequest(
        RATING_URLS.DELETE_RATING,
        requestData,
        'POST'
      );

      if (response.data && response.data.status === 'success') {
        // Clear cache after successful deletion
        this.clearRatingCache();
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data?.message || 'Failed to delete rating');
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
      throw error;
    }
  }

  // Calculate average rating for a product
  calculateAverageRating(ratings) {
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return Math.round((totalRating / ratings.length) * 10) / 10; // Round to 1 decimal place
  }

  // Get rating distribution (count of each star rating)
  getRatingDistribution(ratings) {
    if (!ratings || ratings.length === 0) {
      return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(rating => {
      distribution[rating.rating]++;
    });

    return distribution;
  }
}

export default new RatingService();