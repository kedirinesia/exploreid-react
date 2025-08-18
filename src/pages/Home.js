import React, { useState, useEffect } from 'react';

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5', 
      paddingTop: '60px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Search Section */}
      <div style={{ 
        background: 'white', 
        padding: isDesktop ? '32px 48px' : isTablet ? '24px 32px' : '20px 16px',
        maxWidth: isDesktop ? '1200px' : '100%',
        margin: '0 auto'
      }}>
        <div style={{
          position: 'relative',
          background: '#f8f8f8',
          borderRadius: '25px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          maxWidth: isDesktop ? '600px' : '100%',
          margin: isDesktop ? '0 auto 20px' : '0 0 20px 0'
        }}>
          <span style={{ color: '#999', marginRight: '10px' }}>🔍</span>
          <input 
            type="text"
            placeholder="Where would you like to go?"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '16px',
              color: '#333'
            }}
          />
          <div style={{
            background: '#4CAF50',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px'
          }}>
            ✓
          </div>
        </div>

        {/* Category Icons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'repeat(8, 1fr)' : isTablet ? 'repeat(6, 1fr)' : 'repeat(4, 1fr)',
          gap: isDesktop ? '24px' : '16px',
          marginBottom: '20px',
          maxWidth: isDesktop ? '800px' : '100%',
          margin: isDesktop ? '0 auto 20px' : '0 0 20px 0'
        }}>
          {[
            { icon: '🏨', label: 'Hotel', color: '#FF6B6B', path: '/accommodation' },
            { icon: '🎁', label: 'Souvenirs', color: '#4ECDC4', path: '/souvenirs' },
            { icon: '👨‍🏫', label: 'Guides', color: '#45B7D1', path: '/guides' },
            { icon: '🍜', label: 'Culinary', color: '#FFA726', path: '/culinary' },
            ...(isDesktop ? [
              { icon: '🏛️', label: 'Heritage', color: '#9C27B0', path: '/heritage' },
              { icon: '🌊', label: 'Beach', color: '#00BCD4', path: '/beach' },
              { icon: '🏔️', label: 'Mountain', color: '#8BC34A', path: '/mountain' },
              { icon: '🎭', label: 'Culture', color: '#FF5722', path: '/culture' }
            ] : [])
          ].map((item, index) => (
            <div 
              key={index} 
              onClick={() => window.location.href = item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: isDesktop ? '80px' : isTablet ? '70px' : '60px',
                height: isDesktop ? '80px' : isTablet ? '70px' : '60px',
                borderRadius: '16px',
                background: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isDesktop ? '32px' : isTablet ? '28px' : '24px',
                marginBottom: '8px',
                transition: 'transform 0.3s ease',
                ':hover': {
                  transform: 'scale(1.05)'
                }
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: isDesktop ? '14px' : '12px',
                color: '#666',
                fontWeight: '500'
              }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: isDesktop ? '1200px' : '100%',
        margin: '0 auto',
        padding: isDesktop ? '0 48px' : isTablet ? '0 32px' : '0 16px'
      }}>

        {/* Not sure where to go? Card */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            borderRadius: '16px',
            padding: isDesktop ? '32px' : isTablet ? '24px' : '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{ flex: 1, marginRight: isMobile ? 0 : '20px' }}>
              <h3 style={{
                color: 'white',
                fontSize: isDesktop ? '24px' : isTablet ? '20px' : '18px',
                fontWeight: '600',
                margin: '0 0 8px 0'
              }}>
                Not sure where to go?
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: isDesktop ? '16px' : '14px',
                margin: '0 0 16px 0',
                lineHeight: '1.4'
              }}>
                Let us match you with the perfect trip and best facilities.
              </p>
              <button 
                onClick={() => alert('Feature coming soon!')}
                style={{
                  background: 'white',
                  color: '#4CAF50',
                  border: 'none',
                  borderRadius: '20px',
                  padding: isDesktop ? '12px 24px' : '8px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Find My Match
              </button>
            </div>
            <div style={{
              width: isDesktop ? '100px' : isTablet ? '90px' : '80px',
              height: isDesktop ? '100px' : isTablet ? '90px' : '80px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isDesktop ? '48px' : isTablet ? '44px' : '40px',
              marginTop: isMobile ? '20px' : 0
            }}>
              🗺️
            </div>
          </div>
        </div>

        {/* Open Trips Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontSize: isDesktop ? '28px' : isTablet ? '24px' : '20px',
              fontWeight: '600',
              color: '#333',
              margin: 0
            }}>Open Trips</h2>
            <span 
              onClick={() => window.location.href = '/trips'}
              style={{
                fontSize: '14px',
                color: '#4CAF50',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              See All
            </span>
          </div>

          {/* Trip Cards Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : '1fr',
            gap: isDesktop ? '24px' : isTablet ? '20px' : '16px'
          }}>
            {[
              {
                id: 1,
                title: "Cultural Heritage of Surabaya",
                image: "https://images.unsplash.com/photo-1555400961-f7be474d1c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                duration: "3 Days",
                description: "Discover the rich history and vibrant culture of East Java's bustling city.",
                locations: "10 locations"
              },
              {
                id: 2,
                title: "Sacred Temples of Bali",
                image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                duration: "5 Days",
                description: "Explore ancient temples, traditional villages, and spiritual ceremonies in Ubud and beyond.",
                locations: "8 locations"
              },
              {
                id: 3,
                title: "Hidden Gems of East Bali",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                duration: "4 Days",
                description: "Journey through pristine beaches, water palaces, and breathtaking view of eastern Bali.",
                locations: "9 locations"
              }
            ].map((trip, index) => (
              <div 
                key={trip.id}
                onClick={() => window.location.href = `/trip/${trip.id}`}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (isDesktop) {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDesktop) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <img 
                  src={trip.image}
                  alt={trip.title}
                  style={{
                    width: '100%',
                    height: isDesktop ? '220px' : isTablet ? '200px' : '200px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: isDesktop ? '20px' : '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      fontSize: isDesktop ? '18px' : '16px',
                      fontWeight: '600',
                      color: '#333',
                      margin: 0,
                      flex: 1,
                      lineHeight: '1.3'
                    }}>{trip.title}</h3>
                    <span style={{
                      background: '#E8F5E8',
                      color: '#4CAF50',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                      marginLeft: '8px'
                    }}>{trip.duration}</span>
                  </div>
                  <p style={{
                    color: '#666',
                    fontSize: isDesktop ? '15px' : '14px',
                    lineHeight: '1.4',
                    margin: '0 0 12px 0'
                  }}>
                    {trip.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: '#999',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      📍 {trip.locations}
                    </span>
                    <button style={{
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Picks For You Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontSize: isDesktop ? '28px' : isTablet ? '24px' : '20px',
              fontWeight: '600',
              color: '#333',
              margin: 0
            }}>Top Picks For You</h2>
            <span 
              onClick={() => window.location.href = '/picks'}
              style={{
                fontSize: '14px',
                color: '#4CAF50',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              See All
            </span>
          </div>

          {/* Travel Mood Quiz Card */}
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            borderRadius: '16px',
            padding: isDesktop ? '32px' : isTablet ? '24px' : '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{ flex: 1, marginRight: isMobile ? 0 : '20px' }}>
              <h3 style={{
                color: 'white',
                fontSize: isDesktop ? '24px' : isTablet ? '20px' : '18px',
                fontWeight: '600',
                margin: '0 0 8px 0'
              }}>
                Travel Mood Quiz
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: isDesktop ? '16px' : '14px',
                margin: '0 0 16px 0',
                lineHeight: '1.4'
              }}>
                Discover your perfect destination in 2 minutes
              </p>
              <button 
                onClick={() => alert('Quiz feature coming soon!')}
                style={{
                  background: 'white',
                  color: '#4CAF50',
                  border: 'none',
                  borderRadius: '20px',
                  padding: isDesktop ? '12px 24px' : '8px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Take Quiz
              </button>
            </div>
            <div style={{
              width: isDesktop ? '100px' : isTablet ? '90px' : '80px',
              height: isDesktop ? '100px' : isTablet ? '90px' : '80px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isDesktop ? '48px' : isTablet ? '44px' : '40px',
              marginTop: isMobile ? '20px' : 0
            }}>
              🧭
            </div>
          </div>
        </div>

        {/* Trending Now Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontSize: isDesktop ? '28px' : isTablet ? '24px' : '20px',
              fontWeight: '600',
              color: '#333',
              margin: 0
            }}>Trending Now</h2>
            <span 
              onClick={() => window.location.href = '/trending'}
              style={{
                fontSize: '14px',
                color: '#4CAF50',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              See All
            </span>
          </div>

          {/* Trending Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
            gap: isDesktop ? '20px' : isTablet ? '16px' : '12px'
          }}>
            {[
              { name: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', price: '€2,170/mo', id: 'barcelona' },
              { name: 'Marrakech, Morocco', image: 'https://images.unsplash.com/photo-1544948503-7ad532bc4e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', price: '€890/mo', id: 'marrakech' },
              { name: 'Queenstown, New Zealand', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', price: '€2,330/mo', id: 'queenstown' },
              { name: 'Chiang Mai, Thailand', image: 'https://images.unsplash.com/photo-1563492065-f4bb9db4b72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', price: '€1,450/mo', id: 'chiangmai' }
            ].map((item, index) => (
              <div 
                key={index} 
                onClick={() => window.location.href = `/destination/${item.id}`}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (isDesktop) {
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDesktop) {
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <img 
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: isDesktop ? '140px' : isTablet ? '130px' : '120px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: 'white',
                  padding: '20px 12px 12px',
                  fontSize: isDesktop ? '13px' : '12px'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{item.name}</div>
                  <div style={{ opacity: 0.9 }}>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom spacing for navigation */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
};

export default Home;
