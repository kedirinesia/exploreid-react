# 🚀 Deployment Guide - ExploreID React App

## 📋 Prerequisites
- Vercel account
- GitHub repository
- Node.js (v14+)

## ⚡ Deploy ke Vercel

### 1️⃣ Connect Repository
1. Login ke [Vercel](https://vercel.com)
2. Klik "New Project"
3. Import repository dari GitHub
4. Pilih repository `exploreid-react`

### 2️⃣ Configure Build Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

### 3️⃣ Environment Variables
Tidak perlu environment variables khusus untuk deployment ini.

### 4️⃣ Deploy
Klik "Deploy" dan tunggu proses selesai.

## 🔧 CORS Protection Setup

### ✅ Otomatis Terkonfigurasi
Aplikasi sudah dikonfigurasi untuk:
- **Development**: Menggunakan local CORS proxy (`localhost:3001`)
- **Production**: Menggunakan Vercel serverless function (`/api/proxy`)

### 📁 File yang Ditambahkan
- `api/proxy.js` - Serverless function untuk CORS proxy
- `vercel.json` - Konfigurasi Vercel
- `src/config/proxyConfig.js` - Konfigurasi proxy dinamis

## 🧪 Testing Deployment

### 1️⃣ Test CORS Proxy
```bash
# Test proxy endpoint
curl "https://your-app.vercel.app/api/proxy?targetUrl=https://httpbin.org/get"
```

### 2️⃣ Test API Calls
1. Buka aplikasi di browser
2. Coba login/register
3. Coba fetch data
4. Check browser console untuk error

## 🔍 Troubleshooting

### ❌ CORS Error di Production?
```bash
# Check proxy endpoint
curl "https://your-app.vercel.app/api/proxy?targetUrl=https://httpbin.org/get"

# Expected response: JSON data from httpbin
```

### ❌ API Calls Gagal?
1. Check browser console (F12)
2. Verify proxy endpoint accessible
3. Check network tab untuk request details

### ❌ Serverless Function Timeout?
- Default timeout: 30 detik
- Untuk request yang lebih lama, update `vercel.json`:
```json
{
  "functions": {
    "api/proxy.js": {
      "maxDuration": 60
    }
  }
}
```

## 📊 Monitoring

### Vercel Dashboard
- Monitor function invocations
- Check error logs
- View performance metrics

### Browser Console
- Monitor API calls
- Check proxy responses
- Debug CORS issues

## 🔄 Update Deployment

### Automatic Updates
- Push ke main branch = auto deploy
- Vercel akan rebuild otomatis

### Manual Updates
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy manual
vercel --prod
```

## 🎯 Production Checklist

- [ ] CORS proxy berfungsi
- [ ] API calls berhasil
- [ ] Login/register bekerja
- [ ] Data loading berhasil
- [ ] No console errors
- [ ] Performance acceptable

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions](https://vercel.com/docs/functions)
- [CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Happy Deploying! 🎉**