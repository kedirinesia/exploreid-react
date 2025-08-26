# Troubleshooting Guide - ExploreID React App

## 🚀 Quick Setup Guide

### Step 1: Install Dependencies
```bash
# Install main app dependencies
npm install

# Install CORS proxy dependencies
cd cors-proxy
npm install
cd ..
```

### Step 2: Start CORS Proxy Server
```bash
# Terminal 1: Start CORS proxy
cd cors-proxy
npm start
```
Server akan berjalan di `http://localhost:3001`

### Step 3: Start React App
```bash
# Terminal 2: Start React app
npm start
```
App akan berjalan di `http://localhost:3000`

## 🔧 Common Issues and Solutions

### 1. CORS Error (403 Forbidden)

**Problem**: 
```
Access to XMLHttpRequest at 'https://script.google.com/macros/s/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Cause**: 
Google Apps Script tidak mengizinkan cross-origin requests dari localhost.

**Solutions**:

#### ✅ Solution A: Use CORS Proxy (Recommended)
1. Pastikan CORS proxy server berjalan di port 3001
2. Check di browser: `http://localhost:3001/health`
3. Restart React app jika perlu

#### ✅ Solution B: Check Proxy Status
```bash
# Check if proxy is running
curl http://localhost:3001/health

# Expected response:
# {"status":"OK","message":"CORS Proxy Server is running"}
```

#### ✅ Solution C: Alternative Proxies
Jika CORS proxy tidak berfungsi, aplikasi akan otomatis menggunakan external proxies:
- `api.allorigins.win`
- `cors.bridged.cc`
- `thingproxy.freeboard.io`
- `corsproxy.io`

### 2. Network Error (ERR_NETWORK)

**Problem**: 
```
POST https://script.google.com/macros/s/... net::ERR_FAILED
```

**Solutions**:

#### ✅ Check Internet Connection
```bash
# Test internet connection
ping google.com
```

#### ✅ Check API Endpoints
```bash
# Test API endpoint directly
curl -X POST https://script.google.com/macros/s/AKfycbzSvr4Y6cUJ573waTI-H7yzrsoiNRI7TzUUTIfUjI4r7QeMG1jY0FoYL9wBxs627dWZ/exec \
  -H "Content-Type: application/json" \
  -d '{"action":"GET_RATINGS"}'
```

#### ✅ Check Firewall/Antivirus
- Disable firewall sementara
- Check antivirus blocking network requests
- Try different network (mobile hotspot)

### 3. Rating Not Showing

**Problem**: 
Rating bintang tidak muncul di product cards atau detail page.

**Solutions**:

#### ✅ Check Browser Console
```javascript
// Open browser console (F12) and check for errors
// Look for messages like:
// "Error fetching ratings for product X"
// "Failed to fetch ratings"
```

#### ✅ Check API Response
```javascript
// Test rating API directly
fetch('http://localhost:3001/proxy/https://script.google.com/macros/s/AKfycbyG6_82eS7faFpPH7rQK0ZOjOPNB3rUjSyKPmuf-JQU2svL7jKlUDpqXq8coCYs9j8gnQ/exec')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### ✅ Check Product ID
- Pastikan product ID valid
- Check apakah product memiliki rating
- Test dengan product yang sudah ada rating

### 4. Authentication Issues

**Problem**: 
Login/register tidak berfungsi atau user tidak bisa memberikan rating.

**Solutions**:

#### ✅ Check User Authentication
```javascript
// Check localStorage
console.log(localStorage.getItem('user'));
console.log(localStorage.getItem('token'));
```

#### ✅ Test Login API
```bash
# Test login endpoint
curl -X POST http://localhost:3001/proxy/https://script.google.com/macros/s/AKfycbznONrALGrru66pC-WD7CX49FsnokjxKEARP106z-TEVwBOI7m8HYg4AacSQOSFcKRKBA/exec \
  -H "Content-Type: application/json" \
  -d '{"action":"login","email":"test@example.com","password":"password"}'
```

#### ✅ Clear Browser Data
```javascript
// Clear localStorage
localStorage.clear();
// Refresh page
location.reload();
```

### 5. Header Navigation Issues

**Problem**: 
Logo ExploreID tidak mengarah ke home, atau profile icon tidak berfungsi.

**Solutions**:

#### ✅ Check Console Logs
```javascript
// Open browser console and click logo/profile
// Should see logs like:
// "Logo clicked - navigating to home"
// "Profile icon clicked - navigating to profile"
```

#### ✅ Check Event Handling
- Pastikan tidak ada elemen lain yang menutupi
- Check z-index conflicts
- Verify click events tidak terblokir

### 6. Performance Issues

**Problem**: 
Aplikasi loading lambat atau tidak responsif.

**Solutions**:

#### ✅ Check Network Tab
- Open DevTools → Network tab
- Check request timing
- Look for slow API calls

#### ✅ Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

#### ✅ Check Memory Usage
- Open DevTools → Memory tab
- Check for memory leaks
- Monitor component re-renders

## 🔍 Debug Mode

### Enable Debug Logging
```javascript
// Add to browser console
localStorage.setItem('debug', 'true');

// Or add to code
if (process.env.NODE_ENV === 'development') {
  console.log('Debug mode enabled');
}
```

### Check API Calls
```javascript
// Monitor all API calls
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('API Call:', args[0]);
  return originalFetch.apply(this, args);
};
```

### Check Rating Data
```javascript
// Check rating data in console
ratingService.getRatings().then(data => console.log('All ratings:', data));
ratingService.getRatingsByProduct(1).then(data => console.log('Product 1 ratings:', data));
```

## 🛠️ Development Tools

### Useful Browser Extensions
- **React Developer Tools**: Debug React components
- **Redux DevTools**: Debug state management
- **Network Monitor**: Monitor API calls

### Useful Commands
```bash
# Check running processes
lsof -i :3000  # React app
lsof -i :3001  # CORS proxy

# Kill processes
kill -9 <PID>

# Check port availability
netstat -an | grep :3000
netstat -an | grep :3001
```

## 📱 Mobile Testing

### Test on Mobile Device
1. Find your computer's IP address
2. Access app via: `http://YOUR_IP:3000`
3. Test rating functionality on mobile

### Mobile-Specific Issues
- Touch events not working
- Viewport issues
- Performance on slow devices

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy Checklist
- [ ] CORS proxy deployed
- [ ] Environment variables set
- [ ] API endpoints updated
- [ ] SSL certificate installed
- [ ] Performance optimized

## 📞 Getting Help

### Before Asking for Help
1. Check this troubleshooting guide
2. Check browser console for errors
3. Try the solutions above
4. Test with different browser/device

### Information to Provide
- Browser version
- Operating system
- Error messages (screenshot)
- Steps to reproduce
- Console logs

### Common Error Messages
```
CORS policy: Access blocked
ERR_NETWORK: Failed to fetch
ERR_CONNECTION_REFUSED: Connection refused
ERR_TIMEOUT: Request timeout
```

---

**Still having issues? Check the main README.md for more detailed setup instructions! 🚀**