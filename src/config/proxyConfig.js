// Proxy Configuration untuk Development dan Production

const getProxyUrl = () => {
  // Production: Gunakan Vercel serverless function
  if (process.env.NODE_ENV === 'production') {
    // Jika di-deploy di Vercel, gunakan API route
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
      return `${window.location.origin}/api/proxy?targetUrl=`;
    }
    // Fallback untuk production lainnya
    return 'https://api.allorigins.win/get?url=';
  }
  
  // Development: Gunakan local CORS proxy
  return 'http://localhost:3001/proxy/';
};

// External CORS proxies sebagai fallback
export const EXTERNAL_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://cors.bridged.cc/',
  'https://thingproxy.freeboard.io/fetch/',
  'https://corsproxy.io/?'
];

// Main proxy URL
export const PROXY_URL = getProxyUrl();

// Helper function untuk membuat request dengan proxy
export const createProxyRequest = (targetUrl, data = null, method = 'GET') => {
  const proxyUrl = `${PROXY_URL}${encodeURIComponent(targetUrl)}`;
  
  return {
    url: proxyUrl,
    method: method,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: 30000
  };
};

// Helper function untuk parse response dari berbagai proxy
export const parseProxyResponse = (response) => {
  let data = response.data;
  
  // Handle allorigins format
  if (data && data.contents) {
    try {
      data = JSON.parse(data.contents);
    } catch (e) {
      console.error('Failed to parse allorigins contents:', e);
    }
  }
  
  // Handle some proxies that wrap in data
  if (data && data.data) {
    data = data.data;
  }
  
  return data;
};

export default {
  PROXY_URL,
  EXTERNAL_PROXIES,
  createProxyRequest,
  parseProxyResponse
};