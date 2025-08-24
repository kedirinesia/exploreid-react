const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CORS Proxy Server Running', timestamp: new Date().toISOString() });
});

// Proxy endpoint for all requests
app.all('/proxy/*', async (req, res) => {
  try {
    const targetUrl = req.url.replace('/proxy/', '');
    
    console.log(`🔄 Proxying ${req.method} request to: ${targetUrl}`);
    console.log(`📤 Request headers:`, req.headers);
    console.log(`📦 Request body:`, req.body);
    
    // Prepare request config
    const config = {
      method: req.method,
      url: targetUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Local-CORS-Proxy/1.0'
      },
      timeout: 30000, // 30 seconds timeout
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Accept all responses for debugging
      }
    };
    
    // Add request body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      config.data = req.body;
    }
    
    // Make the request
    const response = await axios(config);
    
    console.log(`✅ Proxy response status: ${response.status}`);
    console.log(`📥 Response headers:`, response.headers);
    console.log(`📦 Response data:`, response.data);
    
    // Forward the response
    res.status(response.status);
    res.set(response.headers);
    res.json(response.data);
    
  } catch (error) {
    console.error(`❌ Proxy error:`, error.message);
    
    // Send detailed error response
    res.status(500).json({
      error: 'Proxy Error',
      message: error.message,
      details: {
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      }
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Local CORS Proxy Server running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Proxy endpoint: http://localhost:${PORT}/proxy/`);
  console.log(`📱 Supported origins: http://localhost:3000, http://localhost:3002, http://localhost:3003`);
});
