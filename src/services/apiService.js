import axios from 'axios';
import { PROXY_URL, EXTERNAL_PROXIES, createProxyRequest, parseProxyResponse } from '../config/proxyConfig';

// Menggunakan CORS proxy untuk mengatasi masalah CORS
const API_BASE_URL = 'https://bit.ly/46VcD8R';

class ApiService {
  // Helper method untuk mencoba berbagai proxy
  async tryWithProxies() {
    // Coba proxy utama dulu
    try {
      console.log(`Trying main proxy: ${PROXY_URL}`);
      const response = await axios.get(`${PROXY_URL}${encodeURIComponent(API_BASE_URL)}`, {
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
      console.log('Using fallback data...');
      // Fallback data untuk development
      return this.getFallbackData();
    }
  }

  // Data fallback untuk development ketika API tidak bisa diakses
  // getFallbackData() {
  //   return [
  //     {
  //       id: 1,
  //       name: "My Kayu",
  //       product: "Kerajinan Kayu Jati",
  //       category: "Handicraft",
  //       description: "Kerajinan Kayu Jati Kekinian, Handmade and Customized",
  //       imageUrl: "https://tse3.mm.bing.net/th/id/OIP.ekS5KmI9QJTqhdZOm9sVgAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  //       address: "Jl. Raya Bojonegoro Cepu KM 19 Sumengko Kalitidu Bojonegoro",
  //       location: "Bojonegoro",
  //       contact: "081259287676",
  //       price: 150000,
  //       rating: 0,
  //       reviews: 0
  //     },
  //     {
  //       id: 2,
  //       name: "Adem Ayem",
  //       product: "Topi Bucket Batik khas Tuban",
  //       category: "Handicraft",
  //       description: "Topi Bucket Batik, Topi Rimbam Batik, Udeng Batik Khas Tuban, Songkok Batik",
  //       imageUrl: "https://tugujatim.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-29-at-09.29.27-1140x570.jpeg",
  //       address: "Desa Kapu Kec. Merakurak RT 01 RW 01 Kec. Merakurak Kab. Tuban",
  //       location: "Tuban",
  //       contact: "085732242358",
  //       price: 50000,
  //       rating: 0,
  //       reviews: 0
  //     },
  //     {
  //       id: 3,
  //       name: "Maria Novita (Raditajaya)",
  //       product: "Premium Handpainting",
  //       category: "Handicraft",
  //       description: "Arts and Craft Handmade with Handpainting. Lukisan, Baju Lukis, Tas Lukis, Hijab Lukis, Kaos Lukis, Kain Sutera Lukis, Sepatu Lukis",
  //       imageUrl: "https://static.wixstatic.com/media/233484_c2c41cb69ecd499b9533f458903c6dba~mv2.jpeg/v1/fill/w_581,h_726,al_c,q_85,usm_0.66_1.00_0.01/233484_c2c41cb69ecd499b9533f458903c6dba~mv2.jpeg",
  //       address: "Perum GRIYA CANDI ASRI BLOK Q NO. 11-12, Sidoarjo",
  //       location: "Sidoarjo",
  //       contact: "081231833732",
  //       price: 250000,
  //       rating: 0,
  //       reviews: 0
  //     },
  //     {
  //       id: 4,
  //       name: "Anyam Indonesia",
  //       product: "Unique Woven Bag",
  //       category: "Handicraft",
  //       description: "Unique woven bag collection, each one made by hand just for you",
  //       imageUrl: "https://anyamindonesia.com/wp-content/uploads/2024/05/20230914_160523-edited-scaled.jpeg",
  //       address: "Surabaya, East Java",
  //       location: "Surabaya",
  //       contact: "085756956227",
  //       price: 300000,
  //       rating: 0,
  //       reviews: 0
  //     },
  //     {
  //       id: 5,
  //       name: "Supiyah Arti Collection",
  //       product: "Aneka Kerajinan Tangan",
  //       category: "Handicraft",
  //       description: "Aneka Rajut, tas manik, ecoprint, souvenir",
  //       imageUrl: "https://imgur.com/pkUJRy5",
  //       address: "Dsn Payaman Ds Trayang Kec. Ngronggot",
  //       location: "Nganjuk",
  //       contact: "081252235989",
  //       price: 150000,
  //       rating: 0,
  //       reviews: 0
  //     },
  //     {
  //       id: 6,
  //       name: "Wins Rajut",
  //       product: "Aneka Rajut",
  //       category: "Handicraft",
  //       description: "Spesialis Dekorasi Rumah dari Rajutan dari eceng gondok dan tanaman gulma",
  //       imageUrl: "https://cdn0-production-images-kly.akamaized.net/H-16k4xXiCcea32zJ1NTKfRKyU8=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4553396/original/009228800_1693144648-IMG-20230827-WA0023.jpg",
  //       address: "Jl. Raya Mlaten No 07 RT 04 RW 02, Ds. Karangrejo Kec. Gempol, Kab. Pasuruan",
  //       location: "Pasuruan",
  //       contact: "081216841956",
  //       price: 100000,
  //       rating: 0,
  //       reviews: 0
  //     },
  //     {
  //       id: 10,
  //       name: "PT. Dapur Sehati Food",
  //       product: "Makanan Olahan Ikan",
  //       category: "Food Items",
  //       description: "Halal, MSG-free fish-based snacks and toppings crafted from fresh, local ingredients in East Java",
  //       imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //       address: "Jl. Pelabuhan Kalbut, Mangaran, Situbondo",
  //       location: "Situbondo",
  //       contact: "081937500830",
  //       price: 20000,
  //       rating: 0,
  //       reviews: 0
  //     },
  //     // Data Hotel/Akomodasi
  //     {
  //       id: 101,
  //       name: "Rumah Singgah Malang",
  //       product: "Homestay Tradisional dengan Fasilitas Modern",
  //       category: "Accommodation",
  //       type: "Homestay",
  //       description: "Homestay nyaman di pusat kota Malang dengan fasilitas lengkap dan pelayanan ramah khas Jawa Timur",
  //       imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //       address: "Jl. Kawi No. 15, Klojen, Malang",
  //       location: "Malang",
  //       contact: "081234567890",
  //       price: 450000,
  //       originalPrice: 500000,
  //       rating: 4.7,
  //       reviews: 127,
  //       distance: "0.6 km from center",
  //       features: ["Free WiFi", "Shared Kitchen", "Air Conditioning", "Breakfast Included"],
  //       host: "Ibu Dewi Kusuma",
  //       hostType: "Superhost",
  //       discount: "25% off recent stays"
  //     },
  //     {
  //       id: 102,
  //       name: "Heritage House Malang",
  //       product: "Hotel Heritage dengan Arsitektur Kolonial",
  //       category: "Accommodation",
  //       type: "Heritage Hotel",
  //       description: "Hotel bersejarah dengan arsitektur kolonial yang memadukan kemewahan modern dengan pesona masa lalu",
  //       imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //       address: "Jl. Ijen Boulevard No. 88, Malang",
  //       location: "Malang",
  //       contact: "082345678901",
  //       price: 750000,
  //       rating: 4.9,
  //       reviews: 89,
  //       distance: "1.2 km from center",
  //       features: ["Free WiFi", "Restaurant", "Swimming Pool", "Spa"],
  //       host: "Pak Bambang",
  //       hostType: "Experienced Host"
  //     },
  //     {
  //       id: 103,
  //       name: "Villa Arjuno View",
  //       product: "Villa Mewah dengan Pemandangan Gunung",
  //       category: "Accommodation",
  //       type: "Villa",
  //       description: "Villa eksklusif dengan pemandangan Gunung Arjuno, dilengkapi kolam renang pribadi dan taman luas",
  //       imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //       address: "Desa Sumber Brantas, Bumiaji, Batu",
  //       location: "Batu",
  //       contact: "083456789012",
  //       price: 1200000,
  //       rating: 4.8,
  //       reviews: 45,
  //       distance: "15 km from center",
  //       features: ["Mountain View", "Private Pool", "Garden", "BBQ Area"],
  //       host: "Villa Management",
  //       hostType: "Professional Host"
  //     },
  //     {
  //       id: 104,
  //       name: "Backpacker Hostel Malang",
  //       product: "Hostel Budget untuk Backpacker",
  //       category: "Accommodation",
  //       type: "Hostel",
  //       description: "Hostel ramah kantong untuk para backpacker dengan fasilitas lengkap dan komunitas yang hangat",
  //       imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //       address: "Jl. Semeru No. 45, Lowokwaru, Malang",
  //       location: "Malang",
  //       contact: "084567890123",
  //       price: 150000,
  //       rating: 4.3,
  //       reviews: 342,
  //       distance: "0.8 km from center",
  //       features: ["Free WiFi", "Shared Kitchen", "Common Area", "Laundry"],
  //       host: "Backpacker Team",
  //       hostType: "Hostel Management"
  //     },
  //     {
  //       id: 105,
  //       name: "Boutique Hotel Ijen",
  //       product: "Hotel Boutique Modern di Jantung Kota",
  //       category: "Accommodation",
  //       type: "Boutique Hotel",
  //       description: "Hotel boutique modern dengan desain kontemporer dan pelayanan personal di kawasan Ijen Boulevard",
  //       imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //       address: "Jl. Ijen Boulevard No. 123, Malang",
  //       location: "Malang",
  //       contact: "085678901234",
  //       price: 900000,
  //       rating: 4.6,
  //       reviews: 78,
  //       distance: "2.1 km from center",
  //       features: ["Restaurant", "Bar", "Meeting Room", "Concierge"],
  //       host: "Hotel Management",
  //       hostType: "Professional Host"
  //     },
  //     {
  //       id: 106,
  //       name: "Modern Loft Surabaya",
  //       product: "Apartemen Modern di Pusat Bisnis",
  //       category: "Accommodation",
  //       type: "Apartment",
  //       description: "Apartemen modern dengan fasilitas lengkap di pusat bisnis Surabaya, cocok untuk business traveler",
  //       imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //       address: "Jl. HR Muhammad No. 88, Surabaya",
  //       location: "Surabaya",
  //       contact: "086789012345",
  //       price: 350000,
  //       rating: 4.5,
  //       reviews: 203,
  //       distance: "0.3 km from center",
  //       features: ["Free WiFi", "Kitchen", "Workspace", "24/7 Security"],
  //       host: "Sarah Johnson",
  //       hostType: "New Host"
  //     }
  //   ];
  // }

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