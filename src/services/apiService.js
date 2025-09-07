import axios from 'axios';
import { PROXY_URL, EXTERNAL_PROXIES, createProxyRequest, parseProxyResponse } from '../config/proxyConfig';

// Menggunakan CORS proxy untuk mengatasi masalah CORS
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbxRPFqkONP_MCkublVT98sAOzvhim-mdC-rG2DXBQp61DjN-UpEpaUnZB6WddearDU91Q/exec?endpoint=ListProducts';

class ApiService {
  // Helper method untuk mencoba berbagai proxy
  async tryWithProxies() {
    // Coba proxy utama dulu
    try {
      console.log(`Trying main proxy: ${PROXY_URL}`);
      const proxyRequest = createProxyRequest(API_BASE_URL);
      const response = await axios.get(proxyRequest.url, {
        timeout: 10000,
        headers: proxyRequest.headers
      });
      
      const data = parseProxyResponse(response);
      
      if (data && data.status === 'success') {
        return data.data.filter(item => item.name && item.name.trim() !== '');
      }
    } catch (proxyError) {
      console.log(`Main proxy failed:`, proxyError.message);
    }

    // Jika proxy utama gagal, coba external proxies
    for (const proxy of EXTERNAL_PROXIES) {
      try {
        console.log(`Trying external proxy: ${proxy}`);
        const proxyUrl = `${proxy}${encodeURIComponent(API_BASE_URL)}`;
        const response = await axios.get(proxyUrl, {
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        const data = parseProxyResponse(response);
        
        if (data && data.status === 'success') {
          return data.data.filter(item => item.name && item.name.trim() !== '');
        }
      } catch (proxyError) {
        console.log(`External proxy ${proxy} failed:`, proxyError.message);
        continue;
      }
    }
    throw new Error('All proxies failed');
  }

  // Mengambil semua data dari API
  async getAllData() {
    try {
      console.log('Fetching data from API...');
      
      // Coba langsung dulu (untuk production)
      try {
        const response = await axios.get(API_BASE_URL, {
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.status === 'success') {
          return response.data.data.filter(item => item.name && item.name.trim() !== '');
        }
      } catch (directError) {
        console.log('Direct API call failed, trying proxies...');
      }
      
      // Jika direct gagal, coba dengan proxy
      return await this.tryWithProxies();
      
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data from API and all proxies failed');
    }
  }


  // Mengambil data khusus akomodasi/hotel
  async getAccommodationData() {
    try {
      const allData = await this.getAllData();
      return allData.filter(item => 
        item.category && 
        item.category.toLowerCase() === 'accommodation'
      );
    } catch (error) {
      console.error('Error fetching accommodation data:', error);
      throw error;
    }
  }

  // Mengambil data akomodasi berdasarkan tipe (Homestay, Hotel, Villa, etc.)
  async getAccommodationByType(type) {
    try {
      const accommodationData = await this.getAccommodationData();
      if (type === 'All') {
        return accommodationData;
      }
      return accommodationData.filter(item => 
        item.type && 
        item.type.toLowerCase().includes(type.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching accommodation by type:', error);
      throw error;
    }
  }

  // Mencari akomodasi berdasarkan keyword
  async searchAccommodation(keyword) {
    try {
      const accommodationData = await this.getAccommodationData();
      const searchTerm = keyword.toLowerCase();
      return accommodationData.filter(item => 
        (item.name && item.name.toLowerCase().includes(searchTerm)) ||
        (item.product && item.product.toLowerCase().includes(searchTerm)) ||
        (item.description && item.description.toLowerCase().includes(searchTerm)) ||
        (item.location && item.location.toLowerCase().includes(searchTerm)) ||
        (item.type && item.type.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching accommodation:', error);
      throw error;
    }
  }

  // Mengambil tipe akomodasi yang tersedia
  async getAvailableAccommodationTypes() {
    try {
      const accommodationData = await this.getAccommodationData();
      const types = [...new Set(accommodationData.map(item => item.type).filter(Boolean))];
      return ['All', ...types];
    } catch (error) {
      console.error('Error fetching accommodation types:', error);
      throw error;
    }
  }

  // Mengambil data berdasarkan kategori
  async getDataByCategory(category) {
    try {
      const allData = await this.getAllData();
      return allData.filter(item => 
        item.category && 
        item.category.toLowerCase() === category.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching data by category:', error);
      throw error;
    }
  }

  // Mengambil data berdasarkan ID
  async getDataById(id) {
    try {
      const allData = await this.getAllData();
      return allData.find(item => item.id == id);
    } catch (error) {
      console.error('Error fetching data by ID:', error);
      throw error;
    }
  }

  // Mengambil data berdasarkan lokasi
  async getDataByLocation(location) {
    try {
      const allData = await this.getAllData();
      return allData.filter(item => 
        item.location && 
        item.location.toLowerCase().includes(location.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching data by location:', error);
      throw error;
    }
  }

  // Mencari data berdasarkan keyword
  async searchData(keyword) {
    try {
      const allData = await this.getAllData();
      const searchTerm = keyword.toLowerCase();
      return allData.filter(item => 
        (item.name && item.name.toLowerCase().includes(searchTerm)) ||
        (item.product && item.product.toLowerCase().includes(searchTerm)) ||
        (item.description && item.description.toLowerCase().includes(searchTerm)) ||
        (item.location && item.location.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching data:', error);
      throw error;
    }
  }

  // Mengambil kategori yang tersedia
  async getAvailableCategories() {
    try {
      const allData = await this.getAllData();
      const categories = [...new Set(allData.map(item => item.category).filter(Boolean))];
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Mengambil lokasi yang tersedia
  async getAvailableLocations() {
    try {
      const allData = await this.getAllData();
      const locations = [...new Set(allData.map(item => item.location).filter(Boolean))];
      return locations;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }
}

export default new ApiService(); 