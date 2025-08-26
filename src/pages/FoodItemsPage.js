import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import ProductRatingDisplay from '../components/ProductRatingDisplay';

const FoodItemsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDataByCategory('Food Items');
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data makanan. Silakan coba lagi.');
      console.error('Error fetching food items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      fetchFoodItems();
      return;
    }

    try {
      setLoading(true);
      const allSearchResults = await apiService.searchData(term);
      // Filter untuk Food Items saja
      const foodSearchResults = allSearchResults.filter(item => 
        item.category && item.category.toLowerCase() === 'food items'
      );
      setProducts(foodSearchResults);
      setError(null);
    } catch (err) {
      setError('Gagal mencari data. Silakan coba lagi.');
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

  // Responsive breakpoints
  const isXLDesktop = windowWidth >= 1440;
  const isLargeDesktop = windowWidth >= 1200;
  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768;
  const isLargeMobile = windowWidth >= 480;
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;

  // Dynamic grid columns
  const getGridColumns = () => {
    if (isXLDesktop) return 4;
    if (isLargeDesktop) return 3;
    if (isDesktop) return 3;
    if (isTablet) return 2;
    return 1;
  };

  // Dynamic spacing
  const getSpacing = (xl, lg, md, sm, xs) => {
    if (isXLDesktop) return xl;
    if (isLargeDesktop) return lg;
    if (isDesktop) return md;
    if (isTablet) return sm;
    return xs;
  };

  // Dynamic font sizes
  const getFontSize = (xl, lg, md, sm, xs) => {
    if (isXLDesktop) return xl;
    if (isLargeDesktop) return lg;
    if (isDesktop) return md;
    if (isTablet) return sm;
    return xs;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5', 
      paddingTop: '60px',
      paddingBottom: isMobile ? '100px' : '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Header with Back Button */}
      <div style={{
        background: 'white',
        padding: getSpacing('24px 64px', '20px 48px', '18px 32px', '16px 24px', '14px 16px'),
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: getSpacing('20px', '18px', '16px', '14px', '12px'),
        maxWidth: isXLDesktop ? '1400px' : isLargeDesktop ? '1200px' : '100%',
        margin: '0 auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
      }}>
        <button 
          onClick={() => window.history.back()}
          style={{
            background: 'none',
            border: 'none',
            fontSize: getFontSize('22px', '20px', '18px', '16px', '14px'),
            cursor: 'pointer',
            padding: getSpacing('12px', '10px', '8px', '6px', '4px'),
            borderRadius: '8px',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.background = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.background = 'none';
            }
          }}
        >
          ←
        </button>
        <h1 style={{
          fontSize: getFontSize('32px', '28px', '24px', '20px', '18px'),
          fontWeight: '700',
          color: '#333',
          margin: 0,
          flex: 1
        }}>
          Makanan & Kuliner
        </h1>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: isXLDesktop ? '1400px' : isLargeDesktop ? '1200px' : '100%',
        margin: '0 auto'
      }}>

        {/* Search Bar */}
        <div style={{ 
          background: 'white', 
          padding: getSpacing('32px 64px', '28px 48px', '24px 32px', '20px 24px', '16px 16px'),
          marginBottom: getSpacing('20px', '18px', '16px', '14px', '12px'),
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            position: 'relative',
            background: '#f8f8f8',
            borderRadius: '25px',
            padding: getSpacing('16px 24px', '14px 20px', '12px 18px', '10px 16px', '8px 14px'),
            display: 'flex',
            alignItems: 'center',
            maxWidth: getSpacing('700px', '650px', '600px', '100%', '100%'),
            margin: isDesktop ? '0 auto' : 0,
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 152, 0, 0.1)';
            e.currentTarget.style.borderColor = '#FF9800';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'transparent';
          }}
          >
            <span style={{ 
              color: '#999', 
              marginRight: '12px',
              fontSize: getFontSize('18px', '16px', '16px', '14px', '14px')
            }}>🔍</span>
            <input 
              type="text"
              placeholder="Cari makanan atau kuliner yang Anda inginkan..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: getFontSize('16px', '15px', '14px', '13px', '12px'),
                color: '#333',
                fontWeight: '400'
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: getSpacing('80px', '70px', '60px', '50px', '40px'),
            fontSize: getFontSize('18px', '16px', '16px', '14px', '13px'),
            color: '#666'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div 
                className="loading-spinner"
                style={{
                  width: getFontSize('28px', '24px', '20px', '18px', '16px'),
                  height: getFontSize('28px', '24px', '20px', '18px', '16px'),
                  border: '3px solid #FF9800',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%'
                }}
              ></div>
              Memuat data makanan...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: getSpacing('28px', '24px', '20px', '18px', '16px'),
            borderRadius: '12px',
            margin: getSpacing('0 64px', '0 48px', '0 32px', '0 24px', '0 16px'),
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(198, 40, 40, 0.1)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            {error}
            <button 
              onClick={fetchFoodItems}
              style={{
                background: '#c62828',
                color: 'white',
                border: 'none',
                padding: getSpacing('12px 24px', '10px 20px', '8px 16px', '6px 12px', '4px 8px'),
                borderRadius: '8px',
                marginLeft: '16px',
                cursor: 'pointer',
                fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.background = '#b71c1c';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.background = '#c62828';
                }
              }}
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div style={{ 
            padding: getSpacing('0 64px', '0 48px', '0 32px', '0 24px', '0 16px')
          }}>
            {products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: getSpacing('80px 40px', '70px 35px', '60px 30px', '50px 25px', '40px 20px'),
                color: '#666'
              }}>
                <div style={{ fontSize: getFontSize('64px', '56px', '48px', '40px', '32px'), marginBottom: '20px' }}>🍜</div>
                <h3 style={{ 
                  fontSize: getFontSize('24px', '22px', '20px', '18px', '16px'),
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#333'
                }}>Belum ada produk makanan</h3>
                <p style={{ 
                  fontSize: getFontSize('16px', '15px', '14px', '13px', '12px'),
                  lineHeight: '1.5',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}>Produk makanan akan segera ditambahkan. Silakan periksa kembali nanti.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
                gap: getSpacing('32px', '28px', '24px', '20px', '16px'),
                marginBottom: getSpacing('40px', '32px', '24px', '20px', '16px')
              }}>
                {products.map(product => (
                  <div 
                    key={product.id}
                    onClick={() => window.location.href = `/product/${product.id}`}
                    style={{
                      background: 'white',
                      borderRadius: getFontSize('20px', '18px', '16px', '14px', '12px'),
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0, 0, 0, 0.04)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                      }
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: getFontSize('16px', '14px', '12px', '10px', '8px'),
                      left: getFontSize('16px', '14px', '12px', '10px', '8px'),
                      background: '#FF9800',
                      color: 'white',
                      padding: getFontSize('8px 16px', '7px 14px', '6px 12px', '5px 10px', '4px 8px'),
                      borderRadius: getFontSize('16px', '14px', '12px', '10px', '8px'),
                      fontSize: getFontSize('12px', '11px', '10px', '9px', '8px'),
                      fontWeight: '600',
                      zIndex: 1,
                      boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)'
                    }}>
                      Food Items
                    </div>
                    
                    <img 
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                      }}
                      style={{
                        width: '100%',
                        height: getFontSize('280px', '250px', '220px', '200px', '180px'),
                        objectFit: 'cover'
                      }}
                    />
                    
                    <div style={{ 
                      padding: getSpacing('28px', '24px', '20px', '18px', '16px')
                    }}>
                      <h3 style={{
                        fontSize: getFontSize('20px', '18px', '16px', '15px', '14px'),
                        fontWeight: '600',
                        color: '#333',
                        margin: '0 0 12px 0',
                        lineHeight: '1.3'
                      }}>
                        {product.name}
                      </h3>
                      
                      {product.product && (
                        <p style={{
                          fontSize: getFontSize('15px', '14px', '13px', '12px', '11px'),
                          color: '#666',
                          margin: '0 0 12px 0',
                          lineHeight: '1.5',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {product.product}
                        </p>
                      )}

                      {product.description && (
                        <p style={{
                          fontSize: getFontSize('13px', '12px', '11px', '10px', '9px'),
                          color: '#999',
                          margin: '0 0 12px 0',
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {product.description}
                        </p>
                      )}

                      {product.location && (
                        <div style={{
                          fontSize: getFontSize('13px', '12px', '11px', '10px', '9px'),
                          color: '#999',
                          marginBottom: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span>📍</span>
                          <span>{product.location}</span>
                        </div>
                      )}
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}>
                          <span style={{
                            fontSize: getFontSize('20px', '18px', '16px', '15px', '14px'),
                            fontWeight: '700',
                            color: '#FF9800'
                          }}>
                            {formatPrice(product.price)}
                          </span>
                          <ProductRatingDisplay 
                            productId={product.id} 
                            size="small"
                          />
                        </div>
                        
                        <button style={{
                          background: '#FF9800',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          padding: getFontSize('12px 24px', '10px 20px', '8px 16px', '7px 14px', '6px 12px'),
                          fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile) {
                            e.target.style.background = '#F57C00';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(255, 152, 0, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile) {
                            e.target.style.background = '#FF9800';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(255, 152, 0, 0.3)';
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
        )}

      </div>
    </div>
  );
};

export default FoodItemsPage; 