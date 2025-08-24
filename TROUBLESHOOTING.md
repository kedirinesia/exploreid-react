# Troubleshooting Guide - ExploreID Authentication System

## Common Issues and Solutions

### 1. CORS Error (403 Forbidden)

**Problem**: 
```
Access to XMLHttpRequest at 'https://script.google.com/macros/s/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Cause**: 
Google Apps Script doesn't allow cross-origin requests from localhost by default.

**Solutions**:

#### Option A: Use Mock API (Recommended for Development)
1. Set `USE_MOCK_API: true` in `src/config/devConfig.js`
2. Use test credentials:
   - Email: `test@example.com`
   - Password: `password`
   - Username: `TestUser`

#### Option B: Deploy to Production
1. Build the app: `npm run build`
2. Deploy to a hosting service (Netlify, Vercel, etc.)
3. Google Apps Script allows requests from production domains

#### Option C: Modify Google Apps Script
1. Add CORS headers in your Google Apps Script:
```javascript
function doPost(e) {
  // Add CORS headers
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // Your existing code here
}
```

### 2. Network Error (ERR_NETWORK)

**Problem**: 
```
POST https://script.google.com/macros/s/... net::ERR_FAILED
```

**Solutions**:
1. Check internet connection
2. Verify Google Apps Script is deployed and accessible
3. Check if the script URL is correct in `apiConfig.js`
4. Use mock API for development

### 3. Styled-components Warning

**Problem**:
```
styled-components: it looks like an unknown prop "active" is being sent through to the DOM
```

**Solution**: 
Use transient props with `$` prefix:
```javascript
// Instead of: active={true}
// Use: $active={true}

const StyledComponent = styled.div`
  color: ${props => props.$active ? 'green' : 'red'};
`;
```

### 4. Authentication State Not Persisting

**Problem**: User gets logged out after page refresh

**Solutions**:
1. Check if localStorage is enabled in browser
2. Verify AuthContext is properly wrapping the app
3. Check browser console for errors

**Session Management Details**:
- **Storage**: localStorage (no token required)
- **Session Duration**: 24 hours from last activity
- **Auto-logout**: Session expires automatically
- **Data Stored**: User info, login time, last activity

### 5. API Response Format Issues

**Problem**: Unexpected API response format

**Expected Format**:
```json
{
  "status": "success",
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "username",
    "email": "email@example.com"
  }
}
```

**Solutions**:
1. Verify Google Apps Script returns correct JSON format
2. Check API endpoint configuration in `apiConfig.js`
3. Use browser dev tools to inspect network requests

### 6. "Unknown Endpoint" Error

**Problem**: 
```
Mock API: Unknown endpoint: https://script.google.com/macros/s/...
```

**Cause**: 
Mock API cannot match the URL pattern with existing rules.

**Solutions**:

#### Option A: Check API Debugger
1. Look at the bottom-left corner for the API Debugger component
2. Check what URLs are being called
3. Verify the endpoint matches patterns in `authService.js`

#### Option B: Update Mock API Rules
1. Open `src/services/authService.js`
2. Check the `getMockResponse` method
3. Add new URL patterns if needed

#### Option C: Use Real API
1. Set `USE_MOCK_API: false` in `src/config/devConfig.js`
2. Deploy to production to avoid CORS issues
3. Test with real Google Apps Script endpoints

**Common URL Patterns**:
- Login: `.../exec` (POST with action: "login")
- Register: `.../exec` (POST with action: "register")  
- Update: `.../exec` (POST with action: "update")
- Delete: `.../exec` (POST with action: "delete")
- Profile: `.../exec?id=123` (GET)

## Development Mode

### Enabling Mock API
1. Open `src/config/devConfig.js`
2. Set `USE_MOCK_API: true`
3. Restart development server

### Test Credentials
- **Email**: `test@example.com`
- **Password**: `password`
- **Username**: `TestUser`

### Mock API Features
- Simulates network delay (500ms)
- Provides realistic responses
- Logs all requests to console
- Works offline

## Production Deployment

### Before Deploying
1. Set `USE_MOCK_API: false` in production
2. Verify all API endpoints are accessible
3. Test authentication flow with real API
4. Remove DevInfo component from production build

### Environment Variables
```bash
# Production
REACT_APP_USE_MOCK_API=false
REACT_APP_API_TIMEOUT=10000

# Development
REACT_APP_USE_MOCK_API=true
REACT_APP_DEBUG_MODE=true
```

## Debug Mode

### Console Logs
- All API requests are logged
- Mock API responses are logged
- Authentication state changes are logged

### Network Tab
- Check request/response headers
- Verify CORS headers
- Monitor API response times

## Getting Help

1. Check browser console for error messages
2. Verify API endpoints are accessible
3. Test with mock API first
4. Check network connectivity
5. Verify Google Apps Script deployment

## Common Workarounds

### For Development
- Use mock API mode
- Test with provided credentials
- Check console logs for debugging

### For Production
- Deploy to hosting service
- Configure CORS in Google Apps Script
- Use production API endpoints 