# Authentication System Components

This directory contains the authentication-related components for the ExploreID React application.

## Components

### 1. Login.js
- **Purpose**: Handles user login functionality
- **Features**: 
  - Email and password input validation
  - Integration with authentication API
  - Error handling and success messages
  - Responsive design with styled-components
  - Redirect to home page after successful login

### 2. Register.js
- **Purpose**: Handles user registration functionality
- **Features**:
  - Username, email, and password input validation
  - Password confirmation
  - Form validation with helpful error messages
  - Integration with registration API
  - Redirect to login page after successful registration

### 3. Profile.js
- **Purpose**: Displays and manages user profile information
- **Features**:
  - View current profile information
  - Edit profile (username, email, password)
  - Delete account functionality
  - Logout functionality
  - Protected route (requires authentication)

### 4. ProtectedRoute.js
- **Purpose**: Wraps components that require authentication
- **Features**:
  - Redirects unauthenticated users to login page
  - Preserves intended destination for post-login redirect
  - Loading state handling

## Usage

### Authentication Flow
1. **Registration**: Users can create new accounts at `/register`
2. **Login**: Users can sign in at `/login`
3. **Profile**: Authenticated users can access their profile at `/profile`
4. **Logout**: Users can log out from the profile page or mobile menu

### API Integration
The components use the authentication service (`../services/authService.js`) which integrates with the API endpoints documented in `../config/apiConfig.js`:

- **Login**: `AUTH_URLS.USER_LOGIN`
- **Register**: `AUTH_URLS.USER_REGISTER`
- **Profile Update**: `USER_URLS.USER_UPDATE`
- **Profile Get**: `USER_URLS.GET_PROFILE`
- **Account Delete**: `USER_URLS.DELETE_ACCOUNT`

### Styling
All components use styled-components for consistent, responsive design with:
- Modern gradient backgrounds
- Smooth animations and transitions
- Mobile-first responsive design
- Consistent color scheme and typography

### State Management
Authentication state is managed through React Context (`../context/AuthContext.js`) providing:
- Global authentication state
- User information
- Login/logout functions
- Profile management functions

## Security Features
- Password validation (minimum 4 characters)
- Email format validation
- Username validation (minimum 3 characters)
- Protected routes for authenticated content
- Secure token storage in localStorage
- Automatic redirect for unauthenticated users

## Responsive Design
- Mobile-optimized forms and navigation
- Touch-friendly buttons and inputs
- Adaptive layouts for different screen sizes
- Consistent user experience across devices 