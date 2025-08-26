import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/header';   
import Home from './pages/Home';
import SouvenirsPage from './pages/SouvenirsPage';
import FoodItemsPage from './pages/FoodItemsPage';
import ProductDetail from './pages/ProductDetail';
import AccommodationDetail from './pages/AccommodationDetail';
import AccommodationList from './pages/AccommodationList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';
import { RatingProvider } from './context/RatingContext';
import './App.css';



const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 80px; /* Space for bottom navigation */
  
  @media (min-width: 768px) {
    padding-bottom: 0; /* No bottom nav on desktop */
  }
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  z-index: 1000;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  cursor: pointer;
  padding: 8px;
`;

const NavIcon = styled.span`
  font-size: 20px;
  color: ${props => props.active ? '#4CAF50' : '#999'};
`;

const NavLabel = styled.span`
  font-size: 10px;
  color: ${props => props.active ? '#4CAF50' : '#999'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const BottomNavigation = ({ windowWidth }) => {
  const isDesktop = windowWidth >= 768;
  
  if (isDesktop) return null; // Hide on desktop
  
  const navItems = [
    { icon: '🏠', label: 'Home', isActive: true, path: '/' },
    { icon: '🧭', label: 'Explore', isActive: false, path: '/explore' },
    { icon: '💾', label: 'Saved', isActive: false, path: '/saved' },
    { icon: '👤', label: 'Profile', isActive: false, path: '/profile' }
  ];
  
  return (
    <BottomNav>
      {navItems.map((item, index) => (
        <NavItem 
          key={index} 
          onClick={() => {
            // Simple navigation - Home will go to root, Profile will go to profile
            window.location.href = item.path;
          }}
        >
          <NavIcon $active={item.isActive}>{item.icon}</NavIcon>
          <NavLabel $active={item.isActive}>{item.label}</NavLabel>
        </NavItem>
      ))}
    </BottomNav>
  );
};

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AuthProvider>
      <RatingProvider>
        <Router>
          <AppContainer>
            {Header ? <Header /> : <div>Header not loaded</div>}
            <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/souvenirs" element={<SouvenirsPage />} />
              <Route path="/culinary" element={<FoodItemsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/accommodation/:id" element={<AccommodationDetail />} />
              <Route path="/accommodation" element={<AccommodationList />} />
              <Route path="/destinations" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Destinasi - Coming Soon!</h2></div>} />
              <Route path="/culture" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Budaya - Coming Soon!</h2></div>} />
              <Route path="/explore" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Explore - Coming Soon!</h2></div>} />
              <Route path="/saved" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Saved - Coming Soon!</h2></div>} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </MainContent>
          <BottomNavigation windowWidth={windowWidth} />
        </AppContainer>
        </Router>
      </RatingProvider>
    </AuthProvider>
  );
}

export default App;
