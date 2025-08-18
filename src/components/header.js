import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    zIndex: 1000,
    padding: '12px 16px'
  };

  const headerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: '#2c3e50'
  };

  const logoIconStyle = {
    width: '24px',
    height: '24px',
    background: '#4CAF50',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  const logoTextStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50'
  };

  // Desktop Navigation
  const desktopNavStyle = {
    display: 'none',
    alignItems: 'center',
    gap: '32px',
    '@media (min-width: 768px)': {
      display: 'flex'
    }
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#2c3e50',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    fontSize: '14px'
  };

  const rightIconsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const iconButtonStyle = {
    background: 'none',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#666'
  };

  const mobileMenuButtonStyle = {
    display: 'block',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#666',
    padding: '8px'
  };

  // Mobile Menu Overlay
  const mobileMenuOverlayStyle = {
    display: isMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: '60px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: '60px',
    left: 0,
    right: 0,
    background: 'white',
    borderBottom: '1px solid #e0e0e0',
    padding: '20px',
    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isMenuOpen ? 1 : 0,
    transition: 'all 0.3s ease',
    zIndex: 1000,
    maxHeight: '80vh',
    overflowY: 'auto'
  };

  const mobileNavLinksStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const mobileNavLinkStyle = {
    textDecoration: 'none',
    color: '#2c3e50',
    fontWeight: '500',
    padding: '16px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: '#f8f9fa',
    textAlign: 'left',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const searchButtonStyle = {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '16px',
    width: '100%'
  };

  // Media query styles using CSS-in-JS approach
  const mediaQueries = `
    @media (min-width: 768px) {
      .desktop-nav {
        display: flex !important;
      }
      .mobile-menu-button {
        display: none !important;
      }
      .header-content {
        padding: 16px 32px !important;
      }
    }
    
    @media (min-width: 1024px) {
      .header-content {
        padding: 16px 48px !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      
      <header style={headerStyle}>
        <div className="header-content" style={headerContentStyle}>
          <a href="/" style={logoStyle}>
            <div style={logoIconStyle}>E</div>
            <span style={logoTextStyle}>ExploreID</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={desktopNavStyle}>
            <a href="/" style={navLinkStyle}>Home</a>
            <a href="/destinations" style={navLinkStyle}>Destinations</a>
            <a href="/experiences" style={navLinkStyle}>Experiences</a>
            <a href="/culture" style={navLinkStyle}>Culture</a>
            <a href="/souvenirs" style={navLinkStyle}>Souvenirs</a>
          </nav>
          
          <div style={rightIconsStyle}>
            {/* Desktop Search Button */}
            <button 
              className="desktop-search"
              style={{
                ...iconButtonStyle,
                background: '#4CAF50',
                color: 'white',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '14px',
                display: 'none'
              }}
            >
              🔍 Search
            </button>
            
            {/* Always visible icons */}
            <button style={iconButtonStyle}>🔔</button>
            <button style={iconButtonStyle}>👤</button>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button"
              style={mobileMenuButtonStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        style={mobileMenuOverlayStyle}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <div style={mobileNavLinksStyle}>
          <a 
            href="/" 
            style={mobileNavLinkStyle}
            onClick={() => setIsMenuOpen(false)}
          >
            🏠 Home
          </a>
          <a 
            href="/destinations" 
            style={mobileNavLinkStyle}
            onClick={() => setIsMenuOpen(false)}
          >
            📍 Destinations
          </a>
          <a 
            href="/experiences" 
            style={mobileNavLinkStyle}
            onClick={() => setIsMenuOpen(false)}
          >
            ⭐ Experiences
          </a>
          <a 
            href="/culture" 
            style={mobileNavLinkStyle}
            onClick={() => setIsMenuOpen(false)}
          >
            🎭 Culture
          </a>
          <a 
            href="/souvenirs" 
            style={mobileNavLinkStyle}
            onClick={() => setIsMenuOpen(false)}
          >
            🎁 Souvenirs
          </a>
        </div>
        
        <button style={searchButtonStyle}>
          🔍 Search Destinations
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-search {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header; 