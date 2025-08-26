import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import ProductRatingDisplay from '../components/ProductRatingDisplay';

const SouvenirsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllData();
      setProducts(data);
      
      // Get unique categories
      const uniqueCategories = ['All', ...new Set(data.map(item => item.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      setError(null);
    } catch (err) {
      setError('Gagal memuat data. Silakan coba lagi.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      fetchData();
      return;
    }

    try {
      setLoading(true);
      const searchResults = await apiService.searchData(term);
      setProducts(searchResults);
      setError(null);
    } catch (err) {
      setError('Gagal mencari data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    
    try {
      setLoading(true);
      let data;
      if (category === 'All') {
        data = await apiService.getAllData();
      } else {
        data = await apiService.getDataByCategory(category);
      }
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Gagal memfilter data. Silakan coba lagi.');
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
      paddingBottom: isMobile ? '100px' : '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Header with Back Button */}
      <div style={{
        background: 'white',
        padding: isDesktop ? '20px 32px' : '16px 20px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '8px',
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
            fontSize: isDesktop ? '24px' : '20px',
            fontWeight: '700',
            color: '#333',
            margin: 0,
            flex: 1
          }}>
            Souvenirs & Kerajinan
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>

        {/* Search Bar */}
        <div style={{ 
          background: 'white', 
          padding: isDesktop ? '24px' : '20px',
          marginBottom: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            position: 'relative',
            background: '#f8f8f8',
            borderRadius: '25px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '600px',
            margin: isDesktop ? '0 auto' : 0,
            transition: 'all 0.3s ease'
          }}>
            <span style={{ 
              color: '#999', 
              marginRight: '12px',
              fontSize: '16px'
            }}>🔍</span>
            <input 
              type="text"
              placeholder="Cari kerajinan atau produk yang Anda inginkan..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '14px',
                color: '#333',
                fontWeight: '400'
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ 
          background: 'white', 
          padding: isDesktop ? '24px' : '20px',
          marginBottom: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            justifyContent: isDesktop ? 'center' : 'flex-start',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                style={{
                  background: selectedCategory === category ? '#4CAF50' : 'transparent',
                  color: selectedCategory === category ? 'white' : '#666',
                  border: selectedCategory === category ? 'none' : '2px solid #e0e0e0',
                  padding: isDesktop ? '12px 24px' : '8px 16px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === category ? '0 4px 12px rgba(76, 175, 80, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile && selectedCategory !== category) {
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.color = '#4CAF50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile && selectedCategory !== category) {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.color = '#666';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px',
            fontSize: '16px',
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
                  width: '24px',
                  height: '24px',
                  border: '3px solid #4CAF50',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%'
                }}
              ></div>
              Memuat data...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '24px',
            borderRadius: '12px',
            margin: '0 0 20px 0',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(198, 40, 40, 0.1)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            {error}
            <button 
              onClick={fetchData}
              style={{
                background: '#c62828',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                marginLeft: '16px',
                cursor: 'pointer',
                fontSize: '12px',
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
          <div>
            {products.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
                <h3 style={{ 
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#333'
                }}>Tidak ada produk ditemukan</h3>
                <p style={{ 
                  fontSize: '14px',
                  lineHeight: '1.5',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}>Coba kata kunci pencarian yang berbeda atau pilih kategori lain.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isDesktop 
                  ? 'repeat(auto-fit, minmax(300px, 1fr))' 
                  : isTablet 
                    ? 'repeat(2, 1fr)' 
                    : '1fr',
                gap: isDesktop ? '24px' : '16px',
                marginBottom: '32px'
              }}>
                {products.map(product => (
                  <div 
                    key={product.id}
                    onClick={() => window.location.href = `/product/${product.id}`}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
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
                    {product.category && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#4CAF50',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '600',
                        zIndex: 1,
                        boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                      }}>
                        {product.category}
                      </div>
                    )}
                    
                    <img 
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                      }}
                      style={{
                        width: '100%',
                        height: isDesktop ? '200px' : '150px',
                        objectFit: 'cover'
                      }}
                    />
                    
                    <div style={{ 
                      padding: isDesktop ? '20px' : '16px'
                    }}>
                      <h3 style={{
                        fontSize: isDesktop ? '16px' : '14px',
                        fontWeight: '600',
                        color: '#333',
                        margin: '0 0 12px 0',
                        lineHeight: '1.3'
                      }}>
                        {product.name}
                      </h3>
                      
                      {product.product && (
                        <p style={{
                          fontSize: '13px',
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

                      {product.location && (
                        <div style={{
                          fontSize: '11px',
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
                            fontSize: isDesktop ? '16px' : '14px',
                            fontWeight: '700',
                            color: '#4CAF50'
                          }}>
                            {formatPrice(product.price)}
                          </span>
                          <ProductRatingDisplay 
                            productId={product.id} 
                            size="small"
                          />
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
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile) {
                            e.target.style.background = '#45A049';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile) {
                            e.target.style.background = '#4CAF50';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)';
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

export default SouvenirsPage; 