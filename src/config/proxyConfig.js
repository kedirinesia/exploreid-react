// Proxy Configuration untuk Development dan Production

const getProxyUrl = () => {
  // Menggunakan cors.bridged.cc sebagai proxy utama karena lebih reliable untuk POST requests
  return 'https://cors.bridged.cc/';
};

// External CORS proxies sebagai fallback
export const EXTERNAL_PROXIES = [
  'https://cors.bridged.cc/',
  'https://thingproxy.freeboard.io/fetch/',
  'https://api.allorigins.win/get?url=',
  'https://cors-anywhere.herokuapp.com/'
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
  
  // cors.bridged.cc returns data directly, no need to parse further
  return data;
};

export default {
  PROXY_URL,
  EXTERNAL_PROXIES,
  createProxyRequest,
  parseProxyResponse
};