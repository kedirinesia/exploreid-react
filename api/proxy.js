// Vercel Serverless Function untuk CORS Proxy
export default async function handler(req, res) {
  // Enable CORS for all origins in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { targetUrl } = req.query;
    
    if (!targetUrl) {
      return res.status(400).json({ 
        error: 'Missing targetUrl parameter',
        usage: 'GET /api/proxy?targetUrl=https://example.com/api'
      });
    }

    console.log(`🔄 Proxying ${req.method} request to: ${targetUrl}`);
    
    // Prepare request config
    const config = {
      method: req.method,
      url: targetUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Vercel-CORS-Proxy/1.0'
      },
      timeout: 30000, // 30 seconds timeout
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    };
    
    // Add request body for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      config.data = req.body;
    }
    
    // Make the request using fetch (built-in in Vercel)
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: config.headers,
      body: req.body ? JSON.stringify(req.body) : undefined,
      signal: AbortSignal.timeout(30000)
    });
    
    const responseData = await response.text();
    
    console.log(`✅ Proxy response status: ${response.status}`);
    
    // Try to parse as JSON, fallback to text
    let parsedData;
    try {
      parsedData = JSON.parse(responseData);
    } catch {
      parsedData = responseData;
    }
    
    // Forward the response
    res.status(response.status).json(parsedData);
    
  } catch (error) {
    console.error(`❌ Proxy error:`, error.message);
    
    res.status(500).json({
      error: 'Proxy Error',
      message: error.message,
      details: {
        code: error.code,
        name: error.name
      }
    });
  }
}