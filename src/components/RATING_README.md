# Rating & Review Feature

Fitur rating dan review yang terintegrasi dengan API Google Apps Script untuk memberikan feedback pada produk.

## Komponen yang Tersedia

### 1. RatingService (`src/services/ratingService.js`)
Service untuk menangani semua operasi API rating:
- `submitRating(userId, productId, rating, review)` - Submit rating baru
- `getRatings()` - Ambil semua rating
- `getRatingsByProduct(productId)` - Ambil rating berdasarkan produk
- `updateRating(ratingId, rating, review)` - Update rating yang sudah ada
- `deleteRating(ratingId)` - Hapus rating
- `calculateAverageRating(ratings)` - Hitung rata-rata rating
- `getRatingDistribution(ratings)` - Hitung distribusi rating

### 2. RatingForm (`src/components/RatingForm.js`)
Form untuk submit atau edit rating:
- Input bintang (1-5)
- Textarea untuk review
- Validasi input
- Support untuk edit rating yang sudah ada

### 3. RatingList (`src/components/RatingList.js`)
Menampilkan daftar rating dan review:
- Summary rating dengan rata-rata
- Distribusi rating per bintang
- Daftar review dengan informasi user
- Tombol hapus untuk rating sendiri

### 4. RatingComponent (`src/components/RatingComponent.js`)
Komponen utama yang menggabungkan semua fitur rating:
- Summary rating
- Form rating
- Daftar rating
- Manajemen state terintegrasi

## Cara Penggunaan

### 1. Import Komponen
```javascript
import RatingComponent from '../components/RatingComponent';
// atau
import RatingForm from '../components/RatingForm';
import RatingList from '../components/RatingList';
```

### 2. Gunakan di Halaman Produk
```javascript
const ProductDetail = () => {
  const { id } = useParams();
  const [refreshRatings, setRefreshRatings] = useState(0);

  const handleRatingSubmitted = () => {
    setRefreshRatings(prev => prev + 1);
  };

  return (
    <div>
      {/* Konten produk lainnya */}
      
      <RatingComponent 
        productId={id}
        productName="Nama Produk"
      />
      
      {/* atau gunakan komponen terpisah */}
      <RatingForm 
        productId={id} 
        onRatingSubmitted={handleRatingSubmitted}
      />
      <RatingList 
        productId={id} 
        key={refreshRatings}
      />
    </div>
  );
};
```

### 3. Gunakan Service Langsung
```javascript
import ratingService from '../services/ratingService';

// Submit rating baru
const submitRating = async () => {
  try {
    const response = await ratingService.submitRating(
      userId, 
      productId, 
      5, 
      "Produk bagus!"
    );
    console.log('Rating submitted:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Ambil rating produk
const getProductRatings = async () => {
  try {
    const response = await ratingService.getRatingsByProduct(productId);
    console.log('Ratings:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## API Endpoints

Berdasarkan `apiConfig.js`, fitur ini menggunakan endpoint berikut:

### Submit Rating
- **URL**: `RATING_URLS.SUBMIT_RATING`
- **Method**: POST
- **Body**:
```json
{
  "action": "SUBMIT_RATING",
  "userId": 2,
  "productId": 2,
  "rating": 5,
  "review": "Produk bagus!"
}
```

### Get Ratings
- **URL**: `RATING_URLS.GET_RATINGS`
- **Method**: GET
- **Response**:
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "productId": 1,
      "userId": 1,
      "rating": 5,
      "review": "Mantap produk ini!",
      "createdAt": "2025-08-24T08:30:29.000Z",
      "updatedAt": "2025-08-24T08:30:29.000Z",
      "userName": "Budi"
    }
  ]
}
```

### Update Rating
- **URL**: `RATING_URLS.UPDATE_RATING`
- **Method**: POST
- **Body**:
```json
{
  "action": "UPDATE_RATING",
  "id": 1,
  "rating": 5,
  "review": "Mantap produk ini!"
}
```

### Delete Rating
- **URL**: `RATING_URLS.DELETE_RATING`
- **Method**: POST
- **Body**:
```json
{
  "action": "DELETE_RATING",
  "id": 2
}
```

## Fitur

### ✅ Yang Sudah Diimplementasi
- [x] Submit rating baru
- [x] Edit rating yang sudah ada
- [x] Hapus rating
- [x] Tampilkan daftar rating
- [x] Hitung rata-rata rating
- [x] Distribusi rating per bintang
- [x] Validasi input
- [x] Error handling
- [x] Loading states
- [x] Responsive design
- [x] CORS proxy support
- [x] Authentication check
- [x] User-specific actions
- [x] **Prevent duplicate ratings** - User tidak bisa rating dua kali

### 🎨 Styling
- Modern UI dengan CSS custom
- Responsive design untuk mobile
- Hover effects dan transitions
- Consistent color scheme
- Accessible design

### 🔒 Security & Validation
- Authentication required untuk submit/edit/delete
- Input validation (rating 1-5, review required)
- User can only edit/delete their own ratings
- **One rating per user per product** - Mencegah rating duplikat
- CORS proxy untuk development
- Error handling untuk network issues

## Behavior untuk User yang Sudah Rating

### 🚫 **Tidak Bisa Rating Dua Kali**
Sistem mencegah user memberikan rating duplikat dengan cara:

1. **Deteksi Rating Existing**: Sistem mengecek apakah user sudah pernah rating produk tersebut
2. **UI Conditional**: 
   - Jika belum rating → Tampilkan tombol "Berikan Rating"
   - Jika sudah rating → Tampilkan "Rating Anda: X bintang" + tombol "Edit Rating"
   - Jika sudah rating tapi tidak ada data → Tampilkan "✅ Anda sudah memberikan rating"

3. **Form Protection**: 
   - Form rating tidak muncul jika user sudah rating (kecuali untuk edit)
   - Pesan "Anda Sudah Memberikan Rating" ditampilkan

### 📱 **User Experience Flow**

#### **Scenario 1: User Belum Rating**
1. User login dan buka detail produk
2. Melihat tombol "Berikan Rating"
3. Klik tombol → Form rating muncul
4. Submit rating → Rating tersimpan
5. Tombol berubah menjadi "Edit Rating"

#### **Scenario 2: User Sudah Rating**
1. User buka detail produk yang sudah pernah di-rating
2. Melihat "Rating Anda: 4 dari 5 bintang"
3. Tombol "Edit Rating" tersedia
4. Klik "Edit Rating" → Form edit muncul dengan data existing
5. Update rating → Rating diperbarui

#### **Scenario 3: User Belum Login**
1. User buka detail produk tanpa login
2. Melihat semua rating yang ada
3. Melihat pesan "Login untuk memberikan rating"
4. Tidak bisa submit rating

## Troubleshooting

### CORS Issues
Jika mengalami masalah CORS, pastikan:
1. CORS proxy server berjalan di `http://localhost:3001`
2. Jalankan `npm start` di folder `cors-proxy`
3. Atau gunakan proxy eksternal yang tersedia

### Authentication Issues
Pastikan user sudah login sebelum menggunakan fitur rating:
```javascript
import { useAuth } from '../context/AuthContext';

const { isAuthenticated, user } = useAuth();
```

### Duplicate Rating Issues
Jika user masih bisa rating dua kali:
1. Pastikan `userHasRated` state di-update dengan benar
2. Cek apakah `existingRating` ditemukan dengan benar
3. Pastikan `userId` matching dengan benar

### API Connection Issues
Service sudah dilengkapi dengan fallback proxy dan error handling yang komprehensif.