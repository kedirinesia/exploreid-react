import React, { useState, useEffect } from 'react';

const AccommodationList = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const accommodations = [
    {
      id: 1,
      name: "Rumah Singgah Malang",
      type: "Homestay",
      price: "Rp 450,000",
      originalPrice: "Rp 500,000",
      rating: 4.7,
      reviews: 127,
      location: "Malang City Center",
      distance: "0.6 km from center",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Free WiFi", "Shared Kitchen", "Air Conditioning", "Breakfast Included"],
      host: "Ibu Dewi Kusuma",
      hostType: "Superhost",
      discount: "25% off recently stays"
    },
    {
      id: 2,
      name: "Heritage House Malang",
      type: "Heritage Hotel",
      price: "Rp 750,000",
      rating: 4.9,
      reviews: 89,
      location: "Historic District",
      distance: "1.2 km from center",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Free WiFi", "Restaurant", "Swimming Pool", "Spa"],
      host: "Pak Bambang",
      hostType: "Experienced Host"
    },
    {
      id: 3,
      name: "Modern Loft Malang",
      type: "Apartment",
      price: "Rp 350,000",
      rating: 4.5,
      reviews: 203,
      location: "City Center",
      distance: "0.3 km from center",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Free WiFi", "Kitchen", "Workspace", "24/7 Security"],
      host: "Sarah Johnson",
      hostType: "New Host"
    },
    {
      id: 4,
      name: "Villa Arjuno View",
      type: "Villa",
      price: "Rp 1,200,000",
      rating: 4.8,
      reviews: 45,
      location: "Arjuno Mountains",
      distance: "15 km from center",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Mountain View", "Private Pool", "Garden", "BBQ Area"],
      host: "Villa Management",
      hostType: "Professional Host"
    },
    {
      id: 5,
      name: "Backpacker Hostel Malang",
      type: "Hostel",
      price: "Rp 150,000",
      rating: 4.3,
      reviews: 342,
      location: "Backpacker District",
      distance: "0.8 km from center",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Free WiFi", "Shared Kitchen", "Common Area", "Laundry"],
      host: "Backpacker Team",
      hostType: "Hostel Management"
    },
    {
      id: 6,
      name: "Boutique Hotel Ijen",
      type: "Boutique Hotel",
      price: "Rp 900,000",
      rating: 4.6,
      reviews: 78,
      location: "Ijen Boulevard",
      distance: "2.1 km from center",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Restaurant", "Bar", "Meeting Room", "Concierge"],
      host: "Hotel Management",
      hostType: "Professional Host"
    }
  ];

  const categories = ['All', 'Homestay', 'Hotel', 'Villa', 'Apartment', 'Hostel'];

  const filteredAccommodations = selectedCategory === 'All' 
    ? accommodations 
    : accommodations.filter(acc => acc.type.includes(selectedCategory));

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
            Hotels & Accommodation
          </h1>
          <button style={{
            background: 'none',
            border: 'none',
            fontSize: isSmallMobile ? '16px' : '18px',
            cursor: 'pointer',
            padding: '8px',
            minWidth: '40px',
            minHeight: '40px'
          }}>
            🔍
          </button>
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
                placeholder="Search hotels, homestays..."
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: isSmallMobile ? '13px' : '14px',
                  color: '#333'
                }}
              />
              <button style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: isSmallMobile ? '6px 12px' : '8px 16px',
                fontSize: isSmallMobile ? '10px' : '12px',
                fontWeight: '600',
                cursor: 'pointer',
                minHeight: '32px'
              }}>
                Search
              </button>
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
                  onClick={() => setSelectedCategory(category)}
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

          {/* Accommodation Grid */}
          <div style={{ 
            padding: isDesktop ? '0 48px' : isTablet ? '0 32px' : isSmallMobile ? '0 12px' : '0 16px'
          }}>
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
              {filteredAccommodations.map(accommodation => (
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

                  {/* Favorite Button */}
                  <button style={{
                    position: 'absolute',
                    top: isSmallMobile ? '8px' : '12px',
                    right: isSmallMobile ? '8px' : '12px',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: isSmallMobile ? '28px' : '36px',
                    height: isSmallMobile ? '28px' : '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: isSmallMobile ? '12px' : '16px',
                    zIndex: 1
                  }}>
                    🤍
                  </button>
                  
                  <img 
                    src={accommodation.image}
                    alt={accommodation.name}
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
                        <span style={{
                          fontSize: isSmallMobile ? '10px' : '12px',
                          color: '#4CAF50',
                          fontWeight: '500'
                        }}>
                          {accommodation.type}
                        </span>
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
                        {accommodation.location} · {accommodation.distance}
                      </span>
                    </div>

                    {/* Rating */}
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
                      <span style={{ fontSize: isSmallMobile ? '10px' : '12px', color: '#666' }}>
                        ({accommodation.reviews} reviews)
                      </span>
                    </div>

                    {/* Features */}
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

                    {/* Host Info */}
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
                        <div style={{ fontSize: isSmallMobile ? '8px' : '10px', color: '#666' }}>
                          {accommodation.hostType}
                        </div>
                      </div>
                    </div>

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
                          {accommodation.price}
                          <span style={{ fontSize: isSmallMobile ? '10px' : '12px', color: '#666', fontWeight: '400' }}>
                            /night
                          </span>
                        </div>
                        {accommodation.originalPrice && (
                          <div style={{
                            fontSize: isSmallMobile ? '10px' : '12px',
                            color: '#999',
                            textDecoration: 'line-through'
                          }}>
                            {accommodation.originalPrice}
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
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button (Desktop Only) */}
            {isDesktop && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '48px',
                marginTop: '24px'
              }}>
                <button style={{
                  background: 'transparent',
                  border: '2px solid #4CAF50',
                  color: '#4CAF50',
                  padding: '12px 32px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Load More Accommodations
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default AccommodationList; 