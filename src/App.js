import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/header';   
import Home from './pages/Home';
import SouvenirsPage from './pages/SouvenirsPage';
import ProductDetail from './pages/ProductDetail';
import AccommodationDetail from './pages/AccommodationDetail';
import AccommodationList from './pages/AccommodationList';
import './App.css';

console.log('Header import:', Header);

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

const BottomNavigation = ({ windowWidth }) => {
  const isDesktop = windowWidth >= 768;
  
  if (isDesktop) return null; // Hide on desktop
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '12px 0',
      zIndex: 1000
    }}>
      {[
        { icon: '🏠', label: 'Home', active: true, path: '/' },
        { icon: '🧭', label: 'Explore', active: false, path: '/explore' },
        { icon: '💾', label: 'Saved', active: false, path: '/saved' },
        { icon: '👤', label: 'Profile', active: false, path: '/profile' }
      ].map((item, index) => (
        <div 
          key={index} 
          onClick={() => window.location.href = item.path}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            flex: 1,
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <span style={{
            fontSize: '20px',
            color: item.active ? '#4CAF50' : '#999'
          }}>{item.icon}</span>
          <span style={{
            fontSize: '10px',
            color: item.active ? '#4CAF50' : '#999',
            fontWeight: item.active ? '600' : '400'
          }}>{item.label}</span>
        </div>
      ))}
    </div>
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
    <Router>
      <AppContainer>
        {Header ? <Header /> : <div>Header not loaded</div>}
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/souvenirs" element={<SouvenirsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/accommodation/:id" element={<AccommodationDetail />} />
            <Route path="/accommodation" element={<AccommodationList />} />
            <Route path="/destinations" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Destinasi - Coming Soon!</h2></div>} />
            <Route path="/culture" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Budaya - Coming Soon!</h2></div>} />
            <Route path="/explore" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Explore - Coming Soon!</h2></div>} />
            <Route path="/saved" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Saved - Coming Soon!</h2></div>} />
            <Route path="/profile" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Profile - Coming Soon!</h2></div>} />
          </Routes>
        </MainContent>
        <BottomNavigation windowWidth={windowWidth} />
      </AppContainer>
    </Router>
  );
}

export default App;
