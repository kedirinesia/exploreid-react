// Test script untuk CORS proxy
const axios = require('axios');

const testProxy = async () => {
  console.log('🧪 Testing CORS Proxy...\n');
  
  // Test URLs
  const testUrls = [
    'https://httpbin.org/get',
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://api.github.com/users/octocat'
  ];
  
  // Test local proxy (development)
  console.log('📍 Testing Local Proxy (Development)...');
  try {
    const localProxy = 'http://localhost:3001/proxy/';
    const response = await axios.get(`${localProxy}${testUrls[0]}`);
    console.log('✅ Local proxy working:', response.status);
  } catch (error) {
    console.log('❌ Local proxy failed:', error.message);
  }
  
  // Test external proxies
  console.log('\n📍 Testing External Proxies...');
  const externalProxies = [
    'https://api.allorigins.win/get?url=',
    'https://cors.bridged.cc/',
    'https://thingproxy.freeboard.io/fetch/',
    'https://corsproxy.io/?'
  ];
  
  for (const proxy of externalProxies) {
    try {
      console.log(`Testing: ${proxy}`);
      const response = await axios.get(`${proxy}${testUrls[0]}`, {
        timeout: 10000
      });
      console.log(`✅ ${proxy} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${proxy} - Error: ${error.message}`);
    }
  }
  
  // Test production proxy (if deployed)
  console.log('\n📍 Testing Production Proxy...');
  try {
    const prodProxy = 'https://exploreid-react.vercel.app/api/proxy?targetUrl=';
    const response = await axios.get(`${prodProxy}${encodeURIComponent(testUrls[0])}`);
    console.log('✅ Production proxy working:', response.status);
  } catch (error) {
    console.log('❌ Production proxy failed:', error.message);
  }
  
  console.log('\n🎉 Proxy testing completed!');
};

// Run test
testProxy().catch(console.error);