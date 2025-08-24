# Konfigurasi API ExploreID React App

## 📁 Struktur File

```
src/config/
├── apiConfig.js      # Konfigurasi endpoint API
├── hostingUrls.js    # URL hosting gratis untuk setiap fitur
├── index.js          # File index untuk import
└── README.md         # Dokumentasi ini
```

## 🚀 Cara Penggunaan

### 1. Setup URL Hosting Gratis

Edit file `hostingUrls.js` dan ganti URL sesuai dengan hosting gratis Anda:

```javascript
// Contoh untuk hosting gratis
export const AUTH_HOSTING_URLS = {
  USER_LOGIN: 'https://abc123.vercel.app',
  USER_REGISTER: 'https://def456.netlify.app',
  USER_LOGOUT: 'https://ghi789.render.com',
  // ... dst
};
```

### 2. Import di Komponen

```javascript
// Import semua config
import { 
  AUTH_HOSTING_URLS, 
  RATING_HOSTING_URLS 
} from '../config';

// Atau import spesifik
import { AUTH_HOSTING_URLS } from '../config';
```

### 3. Gunakan URL

```javascript
// Contoh penggunaan
const loginUrl = AUTH_HOSTING_URLS.USER_LOGIN;
const registerUrl = AUTH_HOSTING_URLS.USER_REGISTER;
const submitRatingUrl = RATING_HOSTING_URLS.SUBMIT_RATING;

// Lakukan HTTP request
const response = await fetch(loginUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## 🔧 Fitur yang Tersedia

### Authentication
- ✅ User Login
- ✅ User Register  
- ✅ User Logout
- ✅ Forgot Password
- ✅ Reset Password

### User Management
- ✅ Get Profile
- ✅ Update Profile
- ✅ Change Password
- ✅ Upload Avatar
- ✅ Delete Account

### Rating & Review
- ✅ Submit Rating
- ✅ Get Ratings
- ✅ Update Rating
- ✅ Delete Rating
- ✅ Get Average Rating

### Content
- ✅ Get All Items
- ✅ Get By Category
- ✅ Get By Location
- ✅ Search Items
- ✅ Get Item By ID

### Booking (Future)
- ✅ Create Booking
- ✅ Get User Bookings
- ✅ Update Booking
- ✅ Cancel Booking

### Notification
- ✅ Get Notifications
- ✅ Mark As Read
- ✅ Delete Notification

### File Upload
- ✅ Upload Image
- ✅ Upload Multiple
- ✅ Delete File

## 📝 Catatan Penting

1. **Setiap fitur memerlukan URL hosting terpisah** karena hosting gratis tidak bisa mengatur route
2. **Ganti semua placeholder URL** dengan URL hosting gratis Anda yang sebenarnya
3. **Pastikan hosting mendukung CORS** untuk request dari frontend
4. **Gunakan HTTPS** untuk keamanan data

## 🌐 Contoh Hosting Gratis

- **Vercel**: `https://your-app.vercel.app`
- **Netlify**: `https://your-app.netlify.app`
- **Render**: `https://your-app.onrender.com`
- **Railway**: `https://your-app.railway.app`
- **Heroku**: `https://your-app.herokuapp.com`

## 🔒 Keamanan

- Jangan commit URL API yang sebenarnya ke Git
- Gunakan environment variables jika memungkinkan
- Pastikan hosting mendukung HTTPS
- Implementasikan rate limiting di backend 