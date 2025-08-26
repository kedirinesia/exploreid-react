# CORS Proxy Server 🚀

Local CORS proxy server untuk mengatasi CORS restrictions saat development.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
# Development mode (dengan auto-reload)
npm run dev

# Production mode
npm start
```

### 3. Server akan running di:
- **URL**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Proxy Endpoint**: http://localhost:3001/proxy/

## 🔧 How It Works

### Proxy Endpoint
```
POST http://localhost:3001/proxy/https://script.google.com/macros/s/.../exec
```

### Supported Origins
- http://localhost:3000 (React App)
- http://localhost:3002 (Alternative port)
- http://localhost:3003 (Alternative port)

### Features
- ✅ **CORS enabled** untuk semua routes
- ✅ **GET & POST support** dengan body parsing
- ✅ **Detailed logging** untuk debugging
- ✅ **Error handling** yang robust
- ✅ **30 second timeout** untuk long requests
- ✅ **Status validation** untuk semua response codes
- ✅ **JSON parsing** untuk request/response
- ✅ **Headers forwarding** untuk authentication

## 📱 Usage in React App

### Basic Usage
```javascript
// authService.js
const localProxy = 'http://localhost:3001/proxy/';

// Example request
const response = await axios.post(
  `${localProxy}${targetUrl}`,
  requestData,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
```

### With Error Handling
```javascript
try {
  const response = await axios.post(
    `${localProxy}${targetUrl}`,
    requestData
  );
  return response.data;
} catch (error) {
  console.error('Proxy request failed:', error);
  throw error;
}
```

## 🛠️ Configuration

### Server Configuration
```javascript
// server.js
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://localhost:3003'
];
```

### Environment Variables
```bash
# .env
PORT=3001
NODE_ENV=development
```

## 📊 API Endpoints

### Health Check
```
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "CORS Proxy Server is running",
  "timestamp": "2025-01-26T10:30:00.000Z"
}
```

### Proxy Request
```
POST /proxy/:targetUrl
```
**Request Body:**
```json
{
  "action": "SUBMIT_RATING",
  "userId": 1,
  "productId": 2,
  "rating": 5,
  "review": "Great product!"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Rating submitted",
  "data": {
    "id": 123
  }
}
```

## 🔍 Debugging

### Enable Detailed Logging
```javascript
// server.js
const DEBUG = process.env.DEBUG === 'true';

if (DEBUG) {
  console.log('🔗 Request:', method, targetUrl);
  console.log('📦 Body:', body);
  console.log('📥 Response:', response.data);
}
```

### Common Issues

**1. CORS Error**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Solution**: Pastikan origin Anda ada di `ALLOWED_ORIGINS`

**2. Connection Refused**
```
Error: connect ECONNREFUSED 127.0.0.1:3001
```
**Solution**: Pastikan server berjalan di port 3001

**3. Timeout Error**
```
Error: timeout of 30000ms exceeded
```
**Solution**: Check target API response time atau increase timeout

## 🚀 Production Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-cors-proxy

# Deploy
git push heroku main
```

### Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Environment Variables for Production
```bash
PORT=3001
NODE_ENV=production
DEBUG=false
```

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "axios": "^1.6.0"
}
```

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start with auto-reload
npm run dev

# Start production mode
npm start
```

### Testing
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test proxy endpoint
curl -X POST http://localhost:3001/proxy/https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## 📄 License

MIT License

---

**Happy Proxying! 🎉**