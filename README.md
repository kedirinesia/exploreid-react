# ExploreID React App

Aplikasi web untuk menjelajahi destinasi wisata Indonesia dengan fitur rating dan review yang lengkap.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 atau lebih baru)
- npm atau yarn

### 1. Clone Repository

```bash
git clone <repository-url>
cd exploreid-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Running the Application

#### Option A: Running dengan CORS Proxy (Recommended)

**Step 1: Start CORS Proxy Server**
```bash
# Buka terminal baru dan jalankan:
cd cors-proxy
npm install
npm start
```

Server CORS akan berjalan di `http://localhost:3001`

**Step 2: Start React App**
```bash
# Kembali ke root directory dan jalankan:
npm start
```

Aplikasi React akan berjalan di `http://localhost:3000`

#### Option B: Running tanpa CORS Proxy

```bash
npm start
```

> **Note**: Jika menggunakan Option B, beberapa fitur API mungkin tidak berfungsi karena CORS restrictions.

## 🔧 Development Setup

### Project Structure

```
exploreid-react/
├── cors-proxy/           # CORS proxy server
│   ├── server.js        # Express server untuk handle CORS
│   └── package.json     # Dependencies untuk proxy
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── context/        # React Context
│   └── config/         # Configuration files
├── public/             # Static files
└── package.json        # Main dependencies
```

### CORS Proxy Server

Server CORS proxy berjalan di port 3001 dan berfungsi untuk:

- Mengatasi CORS restrictions dari Google Apps Script API
- Proxy requests ke external APIs
- Handle authentication requests

**CORS Proxy Features:**
- ✅ Proxy ke Google Apps Script APIs
- ✅ Handle multiple external proxies sebagai fallback
- ✅ Support untuk GET, POST, PUT, DELETE requests
- ✅ Error handling dan logging

### API Configuration

Aplikasi menggunakan Google Apps Script sebagai backend API:

- **Authentication API**: Login, Register, Profile management
- **Product API**: Data produk, akomodasi, kuliner, souvenir
- **Rating API**: Submit, update, delete ratings dan reviews

## 📱 Features

### Core Features
- 🏠 **Home Page**: Featured products dan trending destinations
- 🏨 **Accommodation**: Daftar dan detail akomodasi
- 🎁 **Souvenirs**: Produk kerajinan dan oleh-oleh
- 🍜 **Culinary**: Makanan dan minuman khas
- 🎭 **Culture**: Budaya dan seni tradisional

### Rating & Review System
- ⭐ **Star Rating**: Rating 1-5 bintang
- 📝 **Text Reviews**: Ulasan tertulis
- 👤 **User Authentication**: Login/register untuk memberikan rating
- 🔄 **Real-time Updates**: Update rating secara real-time
- 📊 **Rating Summary**: Rata-rata rating dan jumlah ulasan
- 🚫 **Duplicate Prevention**: Mencegah rating ganda dari user yang sama

### User Experience
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Modern UI**: Clean dan intuitive interface
- ⚡ **Fast Loading**: Optimized performance
- 🔍 **Search & Filter**: Pencarian dan filter produk
- 📍 **Location-based**: Informasi lokasi yang akurat

## 🛠️ Available Scripts

### Main Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (one-way operation)
npm run eject
```

### CORS Proxy Server

```bash
# Start proxy server
cd cors-proxy
npm start

# Development mode dengan auto-reload
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /accommodation` - Get accommodations
- `GET /souvenirs` - Get souvenirs
- `GET /culinary` - Get culinary items

### Ratings
- `POST /ratings` - Submit new rating
- `GET /ratings` - Get all ratings
- `GET /ratings/product/:id` - Get ratings by product
- `PUT /ratings/:id` - Update rating
- `DELETE /ratings/:id` - Delete rating

## 🔧 Configuration

### Environment Variables

Buat file `.env` di root directory:

```env
REACT_APP_API_BASE_URL=https://your-api-url.com
REACT_APP_CORS_PROXY_URL=http://localhost:3001
```

### API Configuration

Edit `src/config/apiConfig.js` untuk mengubah API endpoints:

```javascript
export const AUTH_URLS = {
  USER_LOGIN: 'your-login-endpoint',
  USER_REGISTER: 'your-register-endpoint',
  // ... other endpoints
};
```

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**
```
Error: Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Solution**: Pastikan CORS proxy server berjalan di port 3001

**2. API Connection Failed**
```
Error: Failed to fetch
```
**Solution**: 
- Check internet connection
- Verify API endpoints di `apiConfig.js`
- Check CORS proxy server status

**3. Rating Not Showing**
```
Rating tidak muncul di product cards
```
**Solution**:
- Check browser console untuk errors
- Verify rating API endpoints
- Check user authentication status

### Debug Mode

Enable debug logging:

```javascript
// Di browser console
localStorage.setItem('debug', 'true');
```

## 📦 Dependencies

### Main Dependencies
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `styled-components` - CSS-in-JS

### CORS Proxy Dependencies
- `express` - Web server
- `cors` - CORS middleware
- `axios` - HTTP client

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deploy to Netlify/Vercel

1. Build aplikasi: `npm run build`
2. Deploy folder `build/` ke hosting service
3. Setup environment variables di hosting service

### Deploy CORS Proxy

Deploy CORS proxy server ke platform seperti:
- Heroku
- Railway
- Render
- Vercel (serverless)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📞 Support

Jika mengalami masalah atau butuh bantuan:

1. Check [Troubleshooting](#-troubleshooting) section
2. Check browser console untuk error messages
3. Verify semua dependencies terinstall dengan benar
4. Pastikan CORS proxy server berjalan

---

**Happy Coding! 🎉**