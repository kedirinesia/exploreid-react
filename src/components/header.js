import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;
  const isMobile = windowWidth < 768;

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    zIndex: 1000,
    padding: isDesktop ? '12px 32px' : '12px 16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
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
    color: '#2c3e50',
    transition: 'transform 0.3s ease'
  };

  const logoIconStyle = {
    width: isDesktop ? '32px' : '28px',
    height: isDesktop ? '32px' : '28px',
    background: '#4CAF50',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: isDesktop ? '16px' : '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
  };

  const logoTextStyle = {
    fontSize: isDesktop ? '20px' : '18px',
    fontWeight: '700',
    color: '#2c3e50'
  };

  // Desktop Navigation
  const desktopNavStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: isDesktop ? '32px' : '24px'
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
    color: '#666',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const mobileMenuButtonStyle = {
    display: isMobile ? 'flex' : 'none',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px'
  };

  // Mobile Menu Overlay
  const mobileMenuOverlayStyle = {
    display: isMenuOpen && isMobile ? 'block' : 'none',
    position: 'fixed',
    top: '64px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    backdropFilter: 'blur(4px)'
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: '64px',
    left: 0,
    right: 0,
    background: 'white',
    borderBottom: '1px solid #e0e0e0',
    padding: '24px',
    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isMenuOpen ? 1 : 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    maxHeight: '70vh',
    overflowY: 'auto',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
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
    gap: '12px',
    border: '1px solid transparent'
  };

  const searchButtonStyle = {
    background: 'linear-gradient(135deg, #4CAF50, #45A049)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)'
  };

  const desktopSearchButtonStyle = {
    ...iconButtonStyle,
    background: 'linear-gradient(135deg, #4CAF50, #45A049)',
    color: 'white',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '13px',
    display: isMobile ? 'none' : 'flex',
    width: 'auto',
    height: 'auto',
    gap: '6px',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
  };

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/accommodation', label: 'Hotel', icon: '🏨' },
    { href: '/souvenirs', label: 'Souvenirs', icon: '🎁' },
    { href: '/culinary', label: 'Kuliner', icon: '🍜' },
    { href: '/culture', label: 'Culture', icon: '🎭' }
  ];

  return (
    <>
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <a 
            href="/" 
            style={logoStyle}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <div style={logoIconStyle}>E</div>
            <span style={logoTextStyle}>ExploreID</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav style={desktopNavStyle}>
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = '#E8F5E8';
                  e.target.style.color = '#4CAF50';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#2c3e50';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div style={rightIconsStyle}>
            {/* Desktop Search Button */}
            <button 
              style={desktopSearchButtonStyle}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.background = 'linear-gradient(135deg, #45A049, #4CAF50)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.background = 'linear-gradient(135deg, #4CAF50, #45A049)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)';
                }
              }}
            >
              <span>🔍</span>
              <span>Search</span>
            </button>
            
            {/* Always visible icons */}
            <button 
              style={iconButtonStyle}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.background = '#f5f5f5';
                  e.target.style.color = '#4CAF50';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.background = 'none';
                  e.target.style.color = '#666';
                }
              }}
            >
              🔔
            </button>
            <button 
              style={iconButtonStyle}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.background = '#f5f5f5';
                  e.target.style.color = '#4CAF50';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.background = 'none';
                  e.target.style.color = '#666';
                }
              }}
            >
              👤
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              style={mobileMenuButtonStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={(e) => {
                if (isMobile) {
                  e.target.style.background = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (isMobile) {
                  e.target.style.background = 'none';
                }
              }}
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
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={item.href} 
              style={mobileNavLinkStyle}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.background = '#E8F5E8';
                e.target.style.borderColor = '#4CAF50';
                e.target.style.color = '#4CAF50';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f8f9fa';
                e.target.style.borderColor = 'transparent';
                e.target.style.color = '#2c3e50';
              }}
            >
              <span style={{ fontSize: '18px' }}>
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
        
        <button 
          style={searchButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #45A049, #4CAF50)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #4CAF50, #45A049)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(76, 175, 80, 0.3)';
          }}
        >
          🔍 Search Destinations
        </button>
      </div>
    </>
  );
};

export default Header; 