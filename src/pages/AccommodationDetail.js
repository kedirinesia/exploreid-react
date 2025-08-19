import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const AccommodationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchAccommodationDetail();
  }, [id]);

  const fetchAccommodationDetail = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDataById(id);
      if (data && data.category === 'Accommodation') {
        setAccommodation(data);
        setError(null);
      } else {
        setError('Akomodasi tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal memuat detail akomodasi. Silakan coba lagi.');
      console.error('Error fetching accommodation detail:', err);
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

  const handleContact = (contact) => {
    if (contact) {
      // Format nomor telepon untuk WhatsApp
      const phoneNumber = contact.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/62${phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        paddingTop: '60px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '16px',
          color: '#666'
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
          Memuat detail akomodasi...
        </div>
      </div>
    );
  }

  if (error || !accommodation) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        paddingTop: '60px',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏨</div>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Oops!</h3>
          <p style={{ color: '#666', marginBottom: '24px' }}>{error}</p>
          <button 
            onClick={() => navigate('/accommodation')}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Kembali ke Daftar Akomodasi
          </button>
        </div>
      </div>
    );
  }

  // Media query styles using CSS-in-JS approach
  const mediaQueries = `
    @media (max-width: 480px) {
      .detail-section {
        padding: 16px 12px !important;
        margin-bottom: 12px !important;
      }
      .detail-header {
        padding: 12px 16px !important;
      }
      .detail-grid {
        gap: 8px !important;
      }
      .feature-grid {
        grid-template-columns: 1fr !important;
        gap: 8px !important;
      }
    }
    
    @media (min-width: 481px) and (max-width: 767px) {
      .detail-section {
        padding: 20px 16px !important;
      }
      .feature-grid {
        grid-template-columns: 1fr !important;
      }
    }
    
    @media (min-width: 768px) and (max-width: 1023px) {
      .desktop-layout {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
    }
    
    @media (min-width: 1024px) {
      .desktop-layout {
        grid-template-columns: 2fr 1fr !important;
        gap: 32px !important;
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
        <div className="detail-header" style={{
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
            onClick={() => navigate('/accommodation')}
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
            Detail Akomodasi
          </h1>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: isDesktop ? '1200px' : '100%',
          margin: '0 auto',
          padding: isDesktop ? '32px 48px' : isTablet ? '24px 32px' : isSmallMobile ? '16px 12px' : '20px 16px'
        }}>
          <div className="desktop-layout" style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? '2fr 1fr' : '1fr',
            gap: isDesktop ? '32px' : '24px'
          }}>
            
            {/* Left Column - Main Details */}
            <div>
              {/* Image Gallery */}
              <div style={{
                background: 'white',
                borderRadius: isSmallMobile ? '12px' : '16px',
                overflow: 'hidden',
                marginBottom: isSmallMobile ? '16px' : '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src={accommodation.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={accommodation.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                    style={{
                      width: '100%',
                      height: isDesktop ? '400px' : isTablet ? '300px' : isSmallMobile ? '200px' : '250px',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Type Badge */}
                  {accommodation.type && (
                    <div style={{
                      position: 'absolute',
                      top: isSmallMobile ? '12px' : '20px',
                      left: isSmallMobile ? '12px' : '20px',
                      background: '#4CAF50',
                      color: 'white',
                      padding: isSmallMobile ? '6px 12px' : '8px 16px',
                      borderRadius: isSmallMobile ? '12px' : '20px',
                      fontSize: isSmallMobile ? '11px' : '12px',
                      fontWeight: '600'
                    }}>
                      {accommodation.type}
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {accommodation.discount && (
                    <div style={{
                      position: 'absolute',
                      top: isSmallMobile ? '12px' : '20px',
                      right: isSmallMobile ? '12px' : '20px',
                      background: '#FF5722',
                      color: 'white',
                      padding: isSmallMobile ? '6px 12px' : '8px 16px',
                      borderRadius: isSmallMobile ? '12px' : '20px',
                      fontSize: isSmallMobile ? '11px' : '12px',
                      fontWeight: '600'
                    }}>
                      {accommodation.discount}
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="detail-section" style={{
                background: 'white',
                borderRadius: isSmallMobile ? '12px' : '16px',
                padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px 16px',
                marginBottom: isSmallMobile ? '16px' : '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <h1 style={{
                  fontSize: isDesktop ? '32px' : isTablet ? '28px' : isSmallMobile ? '20px' : '24px',
                  fontWeight: '700',
                  color: '#333',
                  margin: '0 0 12px 0',
                  lineHeight: '1.2'
                }}>
                  {accommodation.name}
                </h1>

                {accommodation.product && (
                  <p style={{
                    fontSize: isDesktop ? '18px' : isSmallMobile ? '14px' : '16px',
                    color: '#666',
                    margin: '0 0 16px 0',
                    lineHeight: '1.5'
                  }}>
                    {accommodation.product}
                  </p>
                )}

                {/* Location */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: isSmallMobile ? '14px' : '16px' }}>📍</span>
                  <div>
                    <div style={{
                      fontSize: isSmallMobile ? '14px' : '16px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      {accommodation.location}
                    </div>
                    {accommodation.distance && (
                      <div style={{
                        fontSize: isSmallMobile ? '12px' : '14px',
                        color: '#666'
                      }}>
                        {accommodation.distance}
                      </div>
                    )}
                    {accommodation.address && (
                      <div style={{
                        fontSize: isSmallMobile ? '11px' : '12px',
                        color: '#999',
                        marginTop: '4px'
                      }}>
                        {accommodation.address}
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                {accommodation.rating && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FFD700', fontSize: isSmallMobile ? '16px' : '18px' }}>⭐</span>
                      <span style={{ 
                        fontSize: isSmallMobile ? '16px' : '18px', 
                        fontWeight: '600', 
                        color: '#333' 
                      }}>
                        {accommodation.rating}
                      </span>
                    </div>
                    {accommodation.reviews && (
                      <span style={{ fontSize: isSmallMobile ? '13px' : '14px', color: '#666' }}>
                        ({accommodation.reviews} ulasan)
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                {accommodation.description && (
                  <div>
                    <h3 style={{
                      fontSize: isDesktop ? '20px' : isSmallMobile ? '16px' : '18px',
                      fontWeight: '600',
                      color: '#333',
                      margin: '0 0 12px 0'
                    }}>
                      Deskripsi
                    </h3>
                    <p style={{
                      fontSize: isDesktop ? '16px' : isSmallMobile ? '13px' : '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {accommodation.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Features */}
              {accommodation.features && accommodation.features.length > 0 && (
                <div className="detail-section" style={{
                  background: 'white',
                  borderRadius: isSmallMobile ? '12px' : '16px',
                  padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px 16px',
                  marginBottom: isSmallMobile ? '16px' : '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <h3 style={{
                    fontSize: isDesktop ? '20px' : isSmallMobile ? '16px' : '18px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 16px 0'
                  }}>
                    Fasilitas
                  </h3>
                  <div className="feature-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
                    gap: isSmallMobile ? '8px' : '12px'
                  }}>
                    {accommodation.features.map((feature, index) => (
                      <div 
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: isSmallMobile ? '8px' : '12px',
                          background: '#f8f8f8',
                          borderRadius: isSmallMobile ? '8px' : '12px'
                        }}
                      >
                        <span style={{ color: '#4CAF50', fontSize: isSmallMobile ? '14px' : '16px' }}>✓</span>
                        <span style={{ 
                          fontSize: isSmallMobile ? '13px' : '14px', 
                          color: '#333',
                          fontWeight: '500'
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Host Info */}
              {accommodation.host && (
                <div className="detail-section" style={{
                  background: 'white',
                  borderRadius: isSmallMobile ? '12px' : '16px',
                  padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px 16px',
                  marginBottom: isSmallMobile ? '16px' : '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <h3 style={{
                    fontSize: isDesktop ? '20px' : isSmallMobile ? '16px' : '18px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 16px 0'
                  }}>
                    Host Information
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSmallMobile ? '12px' : '16px'
                  }}>
                    <div style={{
                      width: isSmallMobile ? '40px' : '50px',
                      height: isSmallMobile ? '40px' : '50px',
                      borderRadius: '50%',
                      background: '#4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: isSmallMobile ? '18px' : '22px',
                      fontWeight: '600'
                    }}>
                      👤
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: isSmallMobile ? '14px' : '16px', 
                        fontWeight: '600', 
                        color: '#333',
                        marginBottom: '4px'
                      }}>
                        {accommodation.host}
                      </div>
                      {accommodation.hostType && (
                        <div style={{ 
                          fontSize: isSmallMobile ? '12px' : '14px', 
                          color: '#4CAF50',
                          fontWeight: '500'
                        }}>
                          {accommodation.hostType}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Booking Card */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: isSmallMobile ? '12px' : '16px',
                padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px 16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                position: isDesktop ? 'sticky' : 'static',
                top: isDesktop ? '100px' : 'auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    fontSize: isDesktop ? '28px' : isSmallMobile ? '20px' : '24px',
                    fontWeight: '700',
                    color: '#333'
                  }}>
                    {formatPrice(accommodation.price)}
                  </span>
                  <span style={{ 
                    fontSize: isSmallMobile ? '13px' : '14px', 
                    color: '#666' 
                  }}>
                    /malam
                  </span>
                </div>

                {accommodation.originalPrice && (
                  <div style={{
                    fontSize: isSmallMobile ? '14px' : '16px',
                    color: '#999',
                    textDecoration: 'line-through',
                    marginBottom: '12px'
                  }}>
                    {formatPrice(accommodation.originalPrice)}
                  </div>
                )}

                {/* Contact Button */}
                {accommodation.contact && (
                  <button
                    onClick={() => handleContact(accommodation.contact)}
                    style={{
                      background: '#25D366',
                      color: 'white',
                      border: 'none',
                      borderRadius: isSmallMobile ? '12px' : '16px',
                      padding: isDesktop ? '16px 24px' : isSmallMobile ? '12px 16px' : '14px 20px',
                      fontSize: isDesktop ? '16px' : isSmallMobile ? '13px' : '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      marginBottom: '16px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#1DA851';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#25D366';
                    }}
                  >
                    <span>💬</span>
                    Hubungi via WhatsApp
                  </button>
                )}

                {/* Book Now Button */}
                <button style={{
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: isSmallMobile ? '12px' : '16px',
                  padding: isDesktop ? '16px 24px' : isSmallMobile ? '12px 16px' : '14px 20px',
                  fontSize: isDesktop ? '16px' : isSmallMobile ? '13px' : '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.3s ease'
                }}>
                  Pesan Sekarang
                </button>

                <div style={{
                  textAlign: 'center',
                  fontSize: isSmallMobile ? '11px' : '12px',
                  color: '#999',
                  marginTop: '12px'
                }}>
                  Anda tidak akan dikenakan biaya sekarang
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccommodationDetail; 