import axios from 'axios';
import { AUTH_URLS, USER_URLS } from '../config/apiConfig';
import { PROXY_URL, EXTERNAL_PROXIES, createProxyRequest, parseProxyResponse } from '../config/proxyConfig';

class AuthService {
  // Helper method to make requests to Google Apps Script
  async makeGoogleScriptRequest(url, data = null, method = 'GET') {
    console.log(`🔗 API Request: ${method} ${url}`, data);
    
    // Use CORS proxy untuk mengatasi masalah CORS
    let targetUrl = `${PROXY_URL}${url}`;
    let useProxy = true;
    
    try {
      if (method === 'POST') {
        console.log('🔗 Making POST request to real API...');
        const response = await axios.post(targetUrl, data, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'https://exploreid-react.vercel.app',
            'X-Requested-With': 'XMLHttpRequest'
          },
          timeout: 15000,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
        });
        
        // Parse proxy response
        const parsedData = parseProxyResponse(response);
        return { ...response, data: parsedData };
      } else {
        console.log('🔗 Making GET request to real API...');
        const response = await axios.get(targetUrl, {
          headers: {
            'Origin': 'https://exploreid-react.vercel.app',
            'X-Requested-With': 'XMLHttpRequest'
          },
          timeout: 15000,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
        });
        
        // Parse proxy response
        const parsedData = parseProxyResponse(response);
        return { ...response, data: parsedData };
      }
    } catch (error) {
      console.error('Request error:', error);
      
      // If CORS proxy fails, try next proxy
      if (useProxy) {
        console.log('🔄 CORS proxy failed, trying next proxy...');
        return await this.tryNextProxy(url, data, method);
      }
      
      // Provide specific error messages for different error types
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied: CORS policy blocked the request. Please contact administrator.');
      } else if (error.response?.status === 0) {
        throw new Error('CORS blocked: Unable to connect to Google Apps Script from localhost. Please deploy to production or use a CORS proxy.');
      }
      
      throw error;
    }
  }





  // Login user
  async login(email, password) {
    try {
      const requestData = {
        action: 'login',
        email: email,
        password: password
      };
      
      console.log('🔍 Sending login request with data:', requestData);
      console.log('🔍 Login URL:', AUTH_URLS.USER_LOGIN);
      
      const response = await this.makeGoogleScriptRequest(AUTH_URLS.USER_LOGIN, requestData, 'POST');

      // Parse response data if needed
      let responseData = response.data;
      if (typeof responseData === 'string') {
        try {
          responseData = JSON.parse(responseData);
        } catch (parseError) {
          console.error('Failed to parse response data:', parseError);
        }
      }
      
      // Check if response data is wrapped by CORS proxy
      if (responseData && responseData.contents) {
        try {
          responseData = JSON.parse(responseData.contents);
        } catch (parseError) {
          console.error('Failed to parse CORS proxy contents:', parseError);
        }
      }
      
      // Check if response is HTML (CORS proxy error page)
      if (typeof responseData === 'string' && responseData.includes('<!DOCTYPE')) {
        console.error('CORS proxy returned HTML instead of JSON');
        
        // Try next proxy if this one failed
        if (process.env.NODE_ENV === 'development') {
          // We need to reconstruct the original request data for fallback
          const originalData = {
            action: 'login',
            email: email,
            password: password
          };
          return await this.tryNextProxy(AUTH_URLS.USER_LOGIN, originalData, 'POST');
        }
        
        throw new Error('CORS proxy returned HTML page. Proxy may be down or blocked.');
      }
      
      // Check if response data is a string that looks like JSON
      if (typeof responseData === 'string' && (responseData.includes('{') || responseData.includes('['))) {
        try {
          responseData = JSON.parse(responseData);
        } catch (parseError) {
          console.error('Failed to parse string response:', parseError);
        }
      }

      // Use parsed response data if available
      const finalResponseData = responseData || response.data;
      
      if (finalResponseData && finalResponseData.status === 'success') {
        // Validate user data structure
        if (!finalResponseData.user || !finalResponseData.user.id) {
          console.error('Invalid user data structure:', finalResponseData);
          throw new Error('Invalid user data received from server');
        }
        
        // Store user data in localStorage (simple session management)
        const sessionData = {
          user: finalResponseData.user,
          userId: finalResponseData.user.id, // Store user ID separately for API calls
          loginTime: new Date().toISOString(),
          lastActivity: new Date().toISOString()
        };
        
        localStorage.setItem('userSession', JSON.stringify(sessionData));
        localStorage.setItem('isAuthenticated', 'true');
        
        return finalResponseData;
      } else {
        console.error('Login failed with response:', finalResponseData);
        throw new Error(finalResponseData?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Provide more specific error messages
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied: CORS policy blocked the request. Please contact administrator.');
      } else {
        throw new Error(error.response?.data?.message || error.message || 'Login failed. Please try again.');
      }
    }
  }

  // Register user
  async register(username, email, password) {
    try {
      const response = await this.makeGoogleScriptRequest(AUTH_URLS.USER_REGISTER, {
        action: 'register',
        username: username,
        email: email,
        password: password
      }, 'POST');

      if (response.data && response.data.status === 'success') {
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Provide more specific error messages
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied: CORS policy blocked the request. Please contact administrator.');
      } else {
        throw new Error(error.response?.data?.message || error.message || 'Registration failed. Please try again.');
      }
    }
  }

  // Get user profile
  async getUserProfile(userId = null) {
    try {
      // If no userId provided, get from session
      let targetUserId = userId;
      if (!targetUserId) {
        const sessionData = localStorage.getItem('userSession');
        if (sessionData) {
          const parsed = JSON.parse(sessionData);
          targetUserId = parsed.userId;
        }
      }
      
      if (!targetUserId) {
        throw new Error('No user ID available. Please login first.');
      }
      
      console.log('🔍 Fetching profile for user ID:', targetUserId);
      const response = await this.makeGoogleScriptRequest(`${USER_URLS.GET_PROFILE}${targetUserId}`);
      
      if (response.data && response.data.status === 'success') {
        return response.data.user;
      } else {
        throw new Error(response.data?.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId = null, userData) {
    try {
      // If no userId provided, get from session
      let targetUserId = userId;
      if (!targetUserId) {
        const sessionData = localStorage.getItem('userSession');
        if (sessionData) {
          const parsed = JSON.parse(sessionData);
          targetUserId = parsed.userId;
        }
      }
      
      if (!targetUserId) {
        throw new Error('No user ID available. Please login first.');
      }
      
      const updateData = {
        action: 'update',
        id: targetUserId,
        ...userData
      };
      
      console.log('🔍 Updating profile for user ID:', targetUserId);
      const response = await this.makeGoogleScriptRequest(USER_URLS.USER_UPDATE, updateData, 'POST');
      
      if (response.data && response.data.status === 'success') {
        // Update local session data
        const sessionData = localStorage.getItem('userSession');
        if (sessionData) {
          const parsed = JSON.parse(sessionData);
          const updatedSession = {
            ...parsed,
            user: { ...parsed.user, ...userData }
          };
          localStorage.setItem('userSession', JSON.stringify(updatedSession));
        }
        
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Delete account
  async deleteAccount(userId = null) {
    try {
      // If no userId provided, get from session
      let targetUserId = userId;
      if (!targetUserId) {
        const sessionData = localStorage.getItem('userSession');
        if (sessionData) {
          const parsed = JSON.parse(sessionData);
          targetUserId = parsed.userId;
        }
      }
      
      if (!targetUserId) {
        throw new Error('No user ID available. Please login first.');
      }
      
      const deleteData = {
        action: 'delete',
        id: targetUserId
      };
      
      console.log('🔍 Deleting account for user ID:', targetUserId);
      const response = await this.makeGoogleScriptRequest(USER_URLS.DELETE_ACCOUNT, deleteData, 'POST');
      
      if (response.data && response.data.status === 'success') {
        // Clear local session
        this.logout();
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  }

  // Try next available CORS proxy
  async tryNextProxy(url, data, method) {
    // Start with external proxies since main proxy already failed
    
    for (let i = 0; i < EXTERNAL_PROXIES.length; i++) {
      try {
        let proxyUrl;
        
        // Handle different proxy URL formats
        if (EXTERNAL_PROXIES[i].includes('allorigins.win')) {
          proxyUrl = `${EXTERNAL_PROXIES[i]}${encodeURIComponent(url)}`;
        } else if (EXTERNAL_PROXIES[i].includes('cors.bridged.cc')) {
          proxyUrl = `${EXTERNAL_PROXIES[i]}${url}`;
        } else {
          proxyUrl = `${EXTERNAL_PROXIES[i]}${encodeURIComponent(url)}`;
        }
        
        if (method === 'POST') {
          const response = await axios.post(proxyUrl, data, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin': 'https://exploreid-react.vercel.app',
              'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 10000,
            validateStatus: function (status) {
              return status >= 200 && status < 500;
            }
          });
          
          // Parse proxy response
          const parsedData = parseProxyResponse(response);
          return { ...response, data: parsedData };
        } else {
          const response = await axios.get(proxyUrl, {
            headers: {
              'Origin': 'https://exploreid-react.vercel.app',
              'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 10000,
            validateStatus: function (status) {
              return status >= 200 && status < 500;
            }
          });
          
          // Parse proxy response
          const parsedData = parseProxyResponse(response);
          return { ...response, data: parsedData };
        }
      } catch (proxyError) {
        continue; // Try next proxy
      }
    }
    
    // All proxies failed
    throw new Error('All CORS proxies failed. Please deploy to production to bypass CORS issues.');
  }

  // Logout user
  logout() {
    localStorage.removeItem('userSession');
    localStorage.removeItem('isAuthenticated');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const sessionData = localStorage.getItem('userSession');
    
    if (!sessionData) {
      return false;
    }
    
    try {
      const parsed = JSON.parse(sessionData);
      
      const loginTime = new Date(parsed.loginTime);
      const lastActivity = new Date(parsed.lastActivity);
      const now = new Date();
      
      // Check if session is expired (24 hours)
      const sessionAge = now.getTime() - loginTime.getTime();
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (sessionAge > maxSessionAge) {
        this.logout();
        return false;
      }
      
      // Update last activity
      parsed.lastActivity = now.toISOString();
      localStorage.setItem('userSession', JSON.stringify(parsed));
      
      return true;
    } catch (error) {
      console.error('Error checking authentication:', error);
      this.logout();
      return false;
    }
  }

  // Get current user data
  getCurrentUser() {
    const sessionData = localStorage.getItem('userSession');
    
    if (!sessionData) {
      return null;
    }
    
    try {
      const parsed = JSON.parse(sessionData);
      return parsed.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Check if user is logged in (alias for isAuthenticated)
  isLoggedIn() {
    return this.isAuthenticated();
  }
}

const authService = new AuthService();
export default authService; 