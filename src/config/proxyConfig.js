// Proxy Configuration untuk Development dan Production

const getProxyUrl = () => {
  // Di production (Vercel), gunakan Vercel serverless function
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return '/api/proxy?targetUrl=';
  }
  
  // Di development, gunakan local proxy atau external proxy
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001/proxy?targetUrl=';
  }
  
  // Fallback ke external proxy
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
  const isVercelProxy = PROXY_URL.includes('/api/proxy');
  
  if (isVercelProxy) {
    // Untuk Vercel proxy, gunakan query parameter
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
  } else {
    // Untuk external proxy, append URL langsung
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
  }
};

// Helper function untuk parse response dari berbagai proxy
export const parseProxyResponse = (response) => {
  let data = response.data;
  
  console.log('🔍 Parsing proxy response:', data);
  
  // Vercel proxy returns data directly
  if (PROXY_URL.includes('/api/proxy')) {
    console.log('🔍 Vercel proxy response:', data);
    return data;
  }
  
  // Handle allorigins format
  if (data && data.contents) {
    try {
      data = JSON.parse(data.contents);
      console.log('🔍 Parsed allorigins contents:', data);
    } catch (e) {
      console.error('Failed to parse allorigins contents:', e);
    }
  }
  
  // Handle some proxies that wrap in data
  if (data && data.data) {
    data = data.data;
    console.log('🔍 Unwrapped data:', data);
  }
  
  // cors.bridged.cc returns data directly, no need to parse further
  console.log('🔍 Final parsed data:', data);
  return data;
};

export default {
  PROXY_URL,
  EXTERNAL_PROXIES,
  createProxyRequest,
  parseProxyResponse
};