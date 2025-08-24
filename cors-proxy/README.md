# Local CORS Proxy Server 🚀

Local CORS proxy server untuk development yang reliable dan cepat.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
# Development mode (with auto-reload)
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
- http://localhost:3000
- http://localhost:3002  
- http://localhost:3003

### Features
- ✅ **CORS enabled** untuk semua routes
- ✅ **GET & POST support** dengan body parsing
- ✅ **Detailed logging** untuk debugging
- ✅ **Error handling** yang robust
- ✅ **30 second timeout** untuk long requests
- ✅ **Status validation** untuk semua response codes

## 📱 Usage in React App

```javascript
// authService.js
const localProxy = 'http://localhost:3001/proxy/';
const targetUrl = `${localProxy}${originalUrl}`;

// Example
const response = await axios.post(
  'http://localhost:3001/proxy/https://script.google.com/macros/s/.../exec',
  { action: 'login', email: 'user@example.com', password: 'password' }
);
```

## 🔄 Fallback System

1. **Local Proxy** (localhost:3001) - Primary
2. **External Proxies** - Fallback jika local gagal
   - api.allorigins.win
   - cors.bridged.cc
   - thingproxy.freeboard.io
   - corsproxy.io

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill process using port 3001
lsof -ti:3001 | xargs kill -9
```

### CORS Issues
- Pastikan origin React app ada di whitelist
- Check browser console untuk error details
- Verify proxy server running

### Network Issues
- Check proxy server logs
- Verify target URL accessible
- Check firewall settings

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:3001/health
```

### Server Logs
Server akan log semua request dan response untuk debugging.

## 🚀 Benefits

- **⚡ Fast**: No external network latency
- **🔒 Reliable**: Controlled environment
- **🐛 Debuggable**: Full request/response logging
- **🔄 Fallback**: External proxies as backup
- **📱 Local**: Works offline, no external dependencies 