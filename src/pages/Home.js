import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const allData = await apiService.getAllData();
      
      // Ambil 6 produk pertama untuk featured
      const featured = allData.slice(0, 6);
      setFeaturedProducts(featured);
      
      // Ambil 4 produk untuk trending (skip 6 pertama)
      const trending = allData.slice(6, 10);
      setTrendingProducts(trending);
      
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `Rp ${price.toLocaleString('id-ID')}`;
    }
    return price || 'Hubungi Penjual';
  };

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768;
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
        padding: isDesktop ? '32px' : '20px',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            position: 'relative',
            background: '#f8f8f8',
            borderRadius: '25px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: isDesktop ? '0 auto 24px' : '0 0 20px 0'
          }}>
            <span style={{ 
              color: '#999', 
              marginRight: '10px',
              fontSize: '16px'
            }}>🔍</span>
            <input 
              type="text"
              placeholder="Cari kerajinan, makanan, atau tempat wisata..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '14px',
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
              fontSize: '16px'
            }}>
              ✓
            </div>
          </div>

          {/* Category Icons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop 
              ? 'repeat(auto-fit, minmax(120px, 1fr))' 
              : isTablet 
                ? 'repeat(4, 1fr)' 
                : 'repeat(2, 1fr)',
            gap: isDesktop ? '24px' : '16px',
            marginBottom: '24px',
            maxWidth: '800px',
            margin: isDesktop ? '0 auto' : '0'
          }}>
            {[
              { icon: '🏨', label: 'Hotel', color: '#FF6B6B', path: '/accommodation' },
              { icon: '🎁', label: 'Souvenirs', color: '#4ECDC4', path: '/souvenirs' },
              { icon: '🍜', label: 'Kuliner', color: '#FFA726', path: '/culinary' },
              { icon: '🎭', label: 'Culture', color: '#FF5722', path: '/culture' }
            ].map((item, index) => (
              <div 
                key={index} 
                onClick={() => window.location.href = item.path}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
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
                <div style={{
                  width: isDesktop ? '80px' : '60px',
                  height: isDesktop ? '80px' : '60px',
                  borderRadius: '16px',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isDesktop ? '32px' : '24px',
                  marginBottom: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
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
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>

        {/* Not sure where to go? Card */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            borderRadius: '16px',
            padding: isDesktop ? '32px' : '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left',
            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)'
          }}>
            <div style={{ flex: 1, marginRight: isMobile ? 0 : '20px' }}>
              <h3 style={{
                color: 'white',
                fontSize: isDesktop ? '24px' : '20px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                lineHeight: '1.2'
              }}>
                Tidak tahu mau kemana?
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: isDesktop ? '16px' : '14px',
                margin: '0 0 20px 0',
                lineHeight: '1.5'
              }}>
                Biarkan kami mencarikan perjalanan dan fasilitas terbaik untuk Anda.
              </p>
              <button 
                onClick={() => alert('Fitur segera hadir!')}
                style={{
                  background: 'white',
                  color: '#4CAF50',
                  border: 'none',
                  borderRadius: '25px',
                  padding: isDesktop ? '12px 24px' : '10px 20px',
                  fontSize: isDesktop ? '14px' : '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }
                }}
              >
                Temukan Pilihan Saya
              </button>
            </div>
            <div style={{
              width: isDesktop ? '100px' : '80px',
              height: isDesktop ? '100px' : '80px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isDesktop ? '48px' : '40px',
              marginTop: isMobile ? '20px' : 0
            }}>
              🗺️
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{
              fontSize: isDesktop ? '28px' : '24px',
              fontWeight: '700',
              color: '#333',
              margin: 0,
              lineHeight: '1.2'
            }}>Produk Unggulan</h2>
            <span 
              onClick={() => window.location.href = '/souvenirs'}
              style={{
                fontSize: '14px',
                color: '#4CAF50',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.color = '#2E7D32';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.color = '#4CAF50';
                }
              }}
            >
              Lihat Semua →
            </span>
          </div>

          {/* Featured Products Grid */}
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '60px',
              fontSize: '16px',
              color: '#666'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div 
                  className="loading-spinner"
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #4CAF50',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%'
                  }}
                ></div>
                Memuat produk unggulan...
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isDesktop 
                ? 'repeat(auto-fit, minmax(300px, 1fr))' 
                : isTablet 
                  ? 'repeat(2, 1fr)' 
                  : '1fr',
              gap: isDesktop ? '24px' : '16px'
            }}>
              {featuredProducts.slice(0, isDesktop ? 6 : isTablet ? 4 : 3).map((product, index) => (
                <div 
                  key={product.id}
                  onClick={() => window.location.href = `/product/${product.id}`}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <img 
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                    style={{
                      width: '100%',
                      height: isDesktop ? '200px' : '150px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: isDesktop ? '20px' : '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <h3 style={{
                        fontSize: isDesktop ? '16px' : '14px',
                        fontWeight: '600',
                        color: '#333',
                        margin: 0,
                        flex: 1,
                        lineHeight: '1.3'
                      }}>{product.name}</h3>
                      {product.category && (
                        <span style={{
                          background: '#E8F5E8',
                          color: '#4CAF50',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          whiteSpace: 'nowrap',
                          marginLeft: '12px'
                        }}>{product.category}</span>
                      )}
                    </div>
                    
                    {product.product && (
                      <p style={{
                        color: '#666',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        margin: '0 0 16px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.product}
                      </p>
                    )}
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div>
                        {product.location && (
                          <span style={{
                            fontSize: '11px',
                            color: '#999',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginBottom: '6px'
                          }}>
                            📍 {product.location}
                          </span>
                        )}
                        <span style={{
                          fontSize: isDesktop ? '16px' : '14px',
                          fontWeight: '700',
                          color: '#4CAF50'
                        }}>
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      
                      <button style={{
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        padding: isDesktop ? '8px 16px' : '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isMobile) {
                          e.target.style.background = '#45A049';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) {
                          e.target.style.background = '#4CAF50';
                        }
                      }}
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Travel Mood Quiz Card */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
            borderRadius: '16px',
            padding: isDesktop ? '32px' : '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left',
            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)'
          }}>
            <div style={{ flex: 1, marginRight: isMobile ? 0 : '20px' }}>
              <h3 style={{
                color: 'white',
                fontSize: isDesktop ? '24px' : '20px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                lineHeight: '1.2'
              }}>
                Kuis Mood Perjalanan
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: isDesktop ? '16px' : '14px',
                margin: '0 0 20px 0',
                lineHeight: '1.5'
              }}>
                Temukan destinasi sempurna Anda dalam 2 menit
              </p>
              <button 
                onClick={() => alert('Fitur kuis segera hadir!')}
                style={{
                  background: 'white',
                  color: '#4CAF50',
                  border: 'none',
                  borderRadius: '25px',
                  padding: isDesktop ? '12px 24px' : '10px 20px',
                  fontSize: isDesktop ? '14px' : '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }
                }}
              >
                Ikuti Kuis
              </button>
            </div>
            <div style={{
              width: isDesktop ? '100px' : '80px',
              height: isDesktop ? '100px' : '80px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isDesktop ? '48px' : '40px',
              marginTop: isMobile ? '20px' : 0
            }}>
              🧭
            </div>
          </div>
        </div>

        {/* Trending Now Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{
              fontSize: isDesktop ? '28px' : '24px',
              fontWeight: '700',
              color: '#333',
              margin: 0,
              lineHeight: '1.2'
            }}>Sedang Trending</h2>
            <span 
              onClick={() => window.location.href = '/souvenirs'}
              style={{
                fontSize: '14px',
                color: '#4CAF50',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.color = '#2E7D32';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.color = '#4CAF50';
                }
              }}
            >
              Lihat Semua →
            </span>
          </div>

          {/* Trending Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop 
              ? 'repeat(4, 1fr)' 
              : isTablet 
                ? 'repeat(3, 1fr)' 
                : 'repeat(2, 1fr)',
            gap: isDesktop ? '20px' : '12px'
          }}>
            {trendingProducts.slice(0, isDesktop ? 4 : isTablet ? 3 : 2).map((item, index) => (
              <div 
                key={index} 
                onClick={() => window.location.href = `/product/${item.id}`}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                  }
                }}
              >
                <img 
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: isDesktop ? '120px' : '100px',
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
                  padding: isDesktop ? '16px 12px 12px' : '12px 8px 8px',
                  fontSize: '12px'
                }}>
                  <div style={{ 
                    fontWeight: '600', 
                    marginBottom: '4px',
                    fontSize: isDesktop ? '13px' : '11px'
                  }}>
                    {item.name}
                  </div>
                  <div style={{ opacity: 0.9, fontSize: '10px' }}>{formatPrice(item.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom spacing for navigation */}
      <div style={{ height: isMobile ? '100px' : '40px' }}></div>
    </div>
  );
};

export default Home;
