import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AccommodationList = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [accommodations, setAccommodations] = useState([]);
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
    fetchAccommodationData();
  }, []);

  const fetchAccommodationData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAccommodationData();
      setAccommodations(data);
      
      // Get available accommodation types
      const types = await apiService.getAvailableAccommodationTypes();
      setCategories(types);
      
      setError(null);
    } catch (err) {
      setError('Gagal memuat data akomodasi. Silakan coba lagi.');
      console.error('Error fetching accommodation data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      // Reset to current category filter
      handleCategoryFilter(selectedCategory);
      return;
    }

    try {
      setLoading(true);
      const searchResults = await apiService.searchAccommodation(term);
      setAccommodations(searchResults);
      setError(null);
    } catch (err) {
      setError('Gagal mencari data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when filtering by category
    
    try {
      setLoading(true);
      const data = await apiService.getAccommodationByType(category);
      setAccommodations(data);
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
    return price || 'Hubungi untuk harga';
  };

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;

  // Media query styles using CSS-in-JS approach
  const mediaQueries = `
    @media (max-width: 480px) {
      .accommodation-card {
        margin-bottom: 12px !important;
      }
      .accommodation-grid {
        gap: 12px !important;
      }
      .search-container {
        padding: 12px 16px !important;
      }
      .category-tabs {
        padding: 12px 16px !important;
      }
    }
    
    @media (min-width: 481px) and (max-width: 767px) {
      .accommodation-grid {
        gap: 16px !important;
      }
    }
    
    @media (min-width: 768px) and (max-width: 1023px) {
      .accommodation-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
      }
    }
    
    @media (min-width: 1024px) and (max-width: 1199px) {
      .accommodation-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 24px !important;
      }
    }
    
    @media (min-width: 1200px) {
      .accommodation-grid {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 24px !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      
      <div style={{ 
        minHeight: '100vh', 
        background: '#f5f5f5', 
        paddingTop: '60px',
        paddingBottom: isDesktop ? '50px' : '100px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        
        {/* Header */}
        <div style={{
          background: 'white',
          padding: isDesktop ? '20px 48px' : isTablet ? '16px 32px' : isSmallMobile ? '12px 16px' : '16px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          gap: isSmallMobile ? '12px' : '16px',
          maxWidth: isDesktop ? '1200px' : '100%',
          margin: '0 auto'
        }}>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: 'none',
              border: 'none',
              fontSize: isSmallMobile ? '16px' : '18px',
              cursor: 'pointer',
              padding: '8px',
              minWidth: '40px',
              minHeight: '40px'
            }}
          >
            ←
          </button>
          <h1 style={{
            fontSize: isDesktop ? '24px' : isTablet ? '20px' : isSmallMobile ? '16px' : '18px',
            fontWeight: '600',
            color: '#333',
            margin: 0,
            flex: 1,
            lineHeight: '1.2'
          }}>
            Hotel & Akomodasi
          </h1>
        </div>

        {/* Main Content Container */}
        <div style={{
          maxWidth: isDesktop ? '1200px' : '100%',
          margin: '0 auto'
        }}>

          {/* Search and Filters */}
          <div className="search-container" style={{ 
            background: 'white', 
            padding: isDesktop ? '24px 48px' : isTablet ? '20px 32px' : isSmallMobile ? '12px 16px' : '16px',
            marginBottom: '16px'
          }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              background: '#f8f8f8',
              borderRadius: '25px',
              padding: isSmallMobile ? '10px 16px' : '12px 20px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: isSmallMobile ? '16px' : '20px',
              maxWidth: isDesktop ? '600px' : '100%',
              margin: isDesktop ? '0 auto 20px' : `0 0 ${isSmallMobile ? '16px' : '20px'} 0`
            }}>
              <span style={{ color: '#999', marginRight: '10px', fontSize: isSmallMobile ? '14px' : '16px' }}>🔍</span>
              <input 
                type="text"
                placeholder="Cari hotel, homestay, villa..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: isSmallMobile ? '13px' : '14px',
                  color: '#333'
                }}
              />
            </div>

            {/* Category Filters */}
            <div className="category-tabs" style={{
              display: 'flex',
              gap: isSmallMobile ? '8px' : '12px',
              overflowX: 'auto',
              paddingBottom: '4px',
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
                    border: selectedCategory === category ? 'none' : '1px solid #ddd',
                    padding: isDesktop ? '12px 24px' : isSmallMobile ? '6px 12px' : '8px 16px',
                    borderRadius: '20px',
                    fontSize: isDesktop ? '14px' : isSmallMobile ? '11px' : '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    minHeight: isSmallMobile ? '28px' : '32px'
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
                Memuat data akomodasi...
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '20px',
              borderRadius: '8px',
              margin: '0 16px',
              textAlign: 'center'
            }}>
              {error}
              <button 
                onClick={fetchAccommodationData}
                style={{
                  background: '#c62828',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  marginLeft: '12px',
                  cursor: 'pointer'
                }}
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Accommodation Grid */}
          {!loading && !error && (
            <div style={{ 
              padding: isDesktop ? '0 48px' : isTablet ? '0 32px' : isSmallMobile ? '0 12px' : '0 16px'
            }}>
              {accommodations.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#666'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏨</div>
                  <h3>Tidak ada akomodasi ditemukan</h3>
                  <p>Coba kata kunci pencarian yang berbeda atau pilih kategori lain.</p>
                </div>
              ) : (
                <div className="accommodation-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: windowWidth >= 1200 
                    ? 'repeat(3, 1fr)' 
                    : isDesktop 
                      ? 'repeat(2, 1fr)'
                      : isTablet 
                        ? 'repeat(2, 1fr)' 
                        : '1fr',
                  gap: isDesktop ? '24px' : isTablet ? '20px' : isSmallMobile ? '12px' : '16px'
                }}>
                  {accommodations.map(accommodation => (
                    <div 
                      key={accommodation.id}
                      className="accommodation-card"
                      onClick={() => window.location.href = `/accommodation/${accommodation.id}`}
                      style={{
                        background: 'white',
                        borderRadius: isSmallMobile ? '12px' : '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        if (isDesktop) {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isDesktop) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        }
                      }}
                    >
                      {/* Discount Badge */}
                      {accommodation.discount && (
                        <div style={{
                          position: 'absolute',
                          top: isSmallMobile ? '8px' : '12px',
                          left: isSmallMobile ? '8px' : '12px',
                          background: '#FF5722',
                          color: 'white',
                          padding: isSmallMobile ? '4px 8px' : '6px 12px',
                          borderRadius: isSmallMobile ? '8px' : '12px',
                          fontSize: isSmallMobile ? '8px' : '10px',
                          fontWeight: '600',
                          zIndex: 1
                        }}>
                          {accommodation.discount}
                        </div>
                      )}

                      {/* Type Badge */}
                      {accommodation.type && (
                        <div style={{
                          position: 'absolute',
                          top: isSmallMobile ? '8px' : '12px',
                          right: isSmallMobile ? '8px' : '12px',
                          background: '#4CAF50',
                          color: 'white',
                          padding: isSmallMobile ? '4px 8px' : '6px 12px',
                          borderRadius: isSmallMobile ? '8px' : '12px',
                          fontSize: isSmallMobile ? '8px' : '10px',
                          fontWeight: '600',
                          zIndex: 1
                        }}>
                          {accommodation.type}
                        </div>
                      )}
                      
                      <img 
                        src={accommodation.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                        alt={accommodation.name}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                        }}
                        style={{
                          width: '100%',
                          height: isDesktop ? '200px' : isTablet ? '180px' : isSmallMobile ? '140px' : '150px',
                          objectFit: 'cover'
                        }}
                      />
                      
                      <div style={{ 
                        padding: isDesktop ? '20px' : isTablet ? '16px' : isSmallMobile ? '10px' : '12px'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: isSmallMobile ? '6px' : '8px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <h3 style={{
                              fontSize: isDesktop ? '16px' : isSmallMobile ? '13px' : '14px',
                              fontWeight: '600',
                              color: '#333',
                              margin: '0 0 4px 0',
                              lineHeight: '1.3'
                            }}>
                              {accommodation.name}
                            </h3>
                            {accommodation.product && (
                              <p style={{
                                fontSize: isSmallMobile ? '10px' : '12px',
                                color: '#666',
                                margin: '0 0 8px 0',
                                lineHeight: '1.4'
                              }}>
                                {accommodation.product}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Location */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginBottom: isSmallMobile ? '6px' : '8px'
                        }}>
                          <span style={{ color: '#999', fontSize: isSmallMobile ? '10px' : '12px' }}>📍</span>
                          <span style={{ color: '#666', fontSize: isSmallMobile ? '10px' : '12px' }}>
                            {accommodation.location}
                            {accommodation.distance && ` · ${accommodation.distance}`}
                          </span>
                        </div>

                        {/* Rating */}
                        {accommodation.rating && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isSmallMobile ? '6px' : '8px',
                            marginBottom: isSmallMobile ? '8px' : '12px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ color: '#FFD700', fontSize: isSmallMobile ? '12px' : '14px' }}>⭐</span>
                              <span style={{ fontSize: isSmallMobile ? '12px' : '14px', fontWeight: '600', color: '#333' }}>
                                {accommodation.rating}
                              </span>
                            </div>
                            {accommodation.reviews && (
                              <span style={{ fontSize: isSmallMobile ? '10px' : '12px', color: '#666' }}>
                                ({accommodation.reviews} reviews)
                              </span>
                            )}
                          </div>
                        )}

                        {/* Features */}
                        {accommodation.features && (
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: isSmallMobile ? '4px' : '6px',
                            marginBottom: isSmallMobile ? '8px' : '12px'
                          }}>
                            {accommodation.features.slice(0, isDesktop ? 4 : isSmallMobile ? 2 : 3).map((feature, index) => (
                              <span 
                                key={index}
                                style={{
                                  background: '#E8F5E8',
                                  color: '#4CAF50',
                                  padding: isSmallMobile ? '2px 6px' : '4px 8px',
                                  borderRadius: isSmallMobile ? '6px' : '8px',
                                  fontSize: isSmallMobile ? '8px' : '10px',
                                  fontWeight: '500'
                                }}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Host Info */}
                        {accommodation.host && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isSmallMobile ? '6px' : '8px',
                            marginBottom: isSmallMobile ? '8px' : '12px'
                          }}>
                            <div style={{
                              width: isSmallMobile ? '20px' : '24px',
                              height: isSmallMobile ? '20px' : '24px',
                              borderRadius: '50%',
                              background: '#4CAF50',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: isSmallMobile ? '10px' : '12px',
                              fontWeight: '600'
                            }}>
                              👤
                            </div>
                            <div>
                              <div style={{ fontSize: isSmallMobile ? '10px' : '12px', fontWeight: '500', color: '#333' }}>
                                Hosted by {accommodation.host}
                              </div>
                              {accommodation.hostType && (
                                <div style={{ fontSize: isSmallMobile ? '8px' : '10px', color: '#666' }}>
                                  {accommodation.hostType}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Price */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{
                              fontSize: isDesktop ? '16px' : isSmallMobile ? '13px' : '14px',
                              fontWeight: '600',
                              color: '#333'
                            }}>
                              {formatPrice(accommodation.price)}
                              <span style={{ fontSize: isSmallMobile ? '10px' : '12px', color: '#666', fontWeight: '400' }}>
                                /malam
                              </span>
                            </div>
                            {accommodation.originalPrice && (
                              <div style={{
                                fontSize: isSmallMobile ? '10px' : '12px',
                                color: '#999',
                                textDecoration: 'line-through'
                              }}>
                                {formatPrice(accommodation.originalPrice)}
                              </div>
                            )}
                          </div>
                          
                          <button style={{
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: isSmallMobile ? '12px' : '16px',
                            padding: isDesktop ? '8px 16px' : isSmallMobile ? '4px 8px' : '6px 12px',
                            fontSize: isDesktop ? '12px' : isSmallMobile ? '9px' : '10px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            minHeight: isSmallMobile ? '24px' : '28px'
                          }}>
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
    </>
  );
};

export default AccommodationList; 