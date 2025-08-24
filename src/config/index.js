// Index file untuk semua konfigurasi
// Import semua config dari satu tempat

// Import API Configuration
export * from './apiConfig';

// Import Hosting URLs
export * from './hostingUrls';

// ===== CONTOH PENGGUNAAN =====
/*
// Import semua config sekaligus
import { 
  AUTH_URLS, 
  RATING_URLS, 
  AUTH_HOSTING_URLS, 
  RATING_HOSTING_URLS 
} from './config';

// Atau import spesifik
import { AUTH_HOSTING_URLS } from './config';

// Gunakan URL
const loginUrl = AUTH_HOSTING_URLS.USER_LOGIN;
const registerUrl = AUTH_HOSTING_URLS.USER_REGISTER;
*/ 