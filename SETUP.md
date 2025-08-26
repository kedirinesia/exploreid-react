# 🚀 Quick Setup Guide - ExploreID React App

## 📋 Prerequisites
- Node.js (v14+)
- npm atau yarn

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install Dependencies
```bash
# Install main app
npm install

# Install CORS proxy
cd cors-proxy && npm install && cd ..
```

### 2️⃣ Start CORS Proxy Server
```bash
# Terminal 1
cd cors-proxy
npm start
```
✅ Server running di: `http://localhost:3001`

### 3️⃣ Start React App
```bash
# Terminal 2
npm start
```
✅ App running di: `http://localhost:3000`

## 🎯 That's It!

Buka browser dan akses: **http://localhost:3000**

## 🔧 Troubleshooting

### ❌ CORS Error?
- Pastikan CORS proxy berjalan di port 3001
- Check: `http://localhost:3001/health`

### ❌ Rating tidak muncul?
- Check browser console (F12)
- Pastikan internet connection OK

### ❌ Login tidak berfungsi?
- Clear browser localStorage
- Refresh halaman

## 📚 More Info

- **Full Documentation**: [README.md](./README.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **CORS Proxy**: [cors-proxy/README.md](./cors-proxy/README.md)

---

**Happy Coding! 🎉**