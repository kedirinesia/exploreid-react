import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { useRating } from '../context/RatingContext';
import RatingComponent from '../components/RatingComponent';
import ProductRatingSummary from '../components/ProductRatingSummary';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshTrigger } = useRating();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDataById(id);
      if (data) {
        setProduct(data);
        setError(null);
      } else {
        setError('Produk tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal memuat detail produk. Silakan coba lagi.');
      console.error('Error fetching product detail:', err);
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

  const handleContact = (contact) => {
    if (contact) {
      // Format nomor telepon untuk WhatsApp
      const phoneNumber = contact.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/62${phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber}`;
      window.open(whatsappUrl, '_blank');
    }
  };



  // Responsive breakpoints
  const isXLDesktop = windowWidth >= 1440;
  const isLargeDesktop = windowWidth >= 1200;
  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768;
  const isLargeMobile = windowWidth >= 480;
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;

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
          gap: '16px',
          fontSize: getFontSize('18px', '16px', '16px', '14px', '13px'),
          color: '#666'
        }}>
          <div 
            className="loading-spinner"
            style={{
              width: getFontSize('28px', '24px', '20px', '18px', '16px'),
              height: getFontSize('28px', '24px', '20px', '18px', '16px'),
              border: '3px solid #4CAF50',
              borderTop: '3px solid transparent',
              borderRadius: '50%'
            }}
          ></div>
          Memuat detail produk...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        paddingTop: '60px',
        padding: getSpacing('40px', '32px', '24px', '20px', '16px')
      }}>
        <div style={{
          background: 'white',
          padding: getSpacing('48px', '40px', '32px', '28px', '24px'),
          borderRadius: getFontSize('20px', '18px', '16px', '14px', '12px'),
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          maxWidth: getSpacing('500px', '450px', '400px', '350px', '300px'),
          width: '100%'
        }}>
          <div style={{ fontSize: getFontSize('64px', '56px', '48px', '40px', '32px'), marginBottom: '20px' }}>😞</div>
          <h3 style={{ 
            marginBottom: '16px', 
            color: '#333',
            fontSize: getFontSize('24px', '22px', '20px', '18px', '16px'),
            fontWeight: '600'
          }}>Oops!</h3>
          <p style={{ 
            color: '#666', 
            marginBottom: '28px',
            fontSize: getFontSize('16px', '15px', '14px', '13px', '12px'),
            lineHeight: '1.5'
          }}>{error}</p>
          <button 
            onClick={() => navigate('/souvenirs')}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: getFontSize('16px 32px', '14px 28px', '12px 24px', '10px 20px', '8px 16px'),
              borderRadius: getFontSize('12px', '10px', '8px', '6px', '4px'),
              cursor: 'pointer',
              fontSize: getFontSize('16px', '15px', '14px', '13px', '12px'),
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.background = '#45A049';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.background = '#4CAF50';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
              }
            }}
          >
            Kembali ke Daftar Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      paddingTop: '60px',
      paddingBottom: isMobile ? '100px' : '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
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
          onClick={() => navigate('/souvenirs')}
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
          Detail Produk
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: isXLDesktop ? '1400px' : isLargeDesktop ? '1200px' : '100%',
        margin: '0 auto',
        padding: getSpacing('40px 64px', '32px 48px', '28px 32px', '24px 24px', '20px 16px')
      }}>
        <div style={{
          background: 'white',
          borderRadius: getFontSize('24px', '20px', '16px', '14px', '12px'),
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          display: isDesktop ? 'flex' : 'block'
        }}>
          {/* Product Image */}
          <div style={{
            width: isDesktop ? '50%' : '100%',
            height: getSpacing('600px', '550px', '500px', '350px', '280px'),
            position: 'relative'
          }}>
            <img 
              src={product.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {product.category && (
              <div style={{
                position: 'absolute',
                top: getSpacing('24px', '20px', '16px', '14px', '12px'),
                left: getSpacing('24px', '20px', '16px', '14px', '12px'),
                background: '#4CAF50',
                color: 'white',
                padding: getSpacing('12px 24px', '10px 20px', '8px 16px', '6px 12px', '4px 8px'),
                borderRadius: getFontSize('20px', '16px', '12px', '10px', '8px'),
                fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
              }}>
                {product.category}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{
            width: isDesktop ? '50%' : '100%',
            padding: getSpacing('48px', '40px', '32px', '28px', '24px')
          }}>
            <h1 style={{
              fontSize: getFontSize('40px', '36px', '32px', '28px', '24px'),
              fontWeight: '700',
              color: '#333',
              margin: '0 0 20px 0',
              lineHeight: '1.2'
            }}>
              {product.name}
            </h1>

            {product.product && (
              <p style={{
                fontSize: getFontSize('20px', '18px', '16px', '15px', '14px'),
                color: '#666',
                margin: '0 0 24px 0',
                lineHeight: '1.5',
                fontWeight: '400'
              }}>
                {product.product}
              </p>
            )}

            <div style={{
              fontSize: getFontSize('36px', '32px', '28px', '24px', '20px'),
              fontWeight: '700',
              color: '#4CAF50',
              margin: '0 0 32px 0'
            }}>
              {formatPrice(product.price)}
            </div>

            {product.description && (
              <div style={{ marginBottom: getSpacing('32px', '28px', '24px', '20px', '16px') }}>
                <h3 style={{
                  fontSize: getFontSize('24px', '22px', '20px', '18px', '16px'),
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 16px 0'
                }}>
                  Deskripsi Produk
                </h3>
                <p style={{
                  fontSize: getFontSize('18px', '16px', '15px', '14px', '13px'),
                  color: '#666',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {product.description}
                </p>
              </div>
            )}

            {/* Location Info */}
            {product.location && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: getSpacing('24px', '20px', '16px', '14px', '12px'),
                padding: getSpacing('20px', '18px', '16px', '14px', '12px'),
                background: '#f8f8f8',
                borderRadius: getFontSize('16px', '14px', '12px', '10px', '8px')
              }}>
                <span style={{ fontSize: getFontSize('24px', '20px', '18px', '16px', '14px') }}>📍</span>
                <div>
                  <div style={{
                    fontSize: getFontSize('18px', '16px', '15px', '14px', '13px'),
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '4px'
                  }}>
                    Lokasi
                  </div>
                  <div style={{
                    fontSize: getFontSize('16px', '15px', '14px', '13px', '12px'),
                    color: '#666'
                  }}>
                    {product.location}
                  </div>
                  {product.address && (
                    <div style={{
                      fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
                      color: '#999',
                      marginTop: '4px'
                    }}>
                      {product.address}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Button */}
            {product.contact && (
              <button
                onClick={() => handleContact(product.contact)}
                style={{
                  background: '#25D366',
                  color: 'white',
                  border: 'none',
                  borderRadius: getFontSize('16px', '14px', '12px', '10px', '8px'),
                  padding: getFontSize('20px 40px', '18px 36px', '16px 32px', '14px 28px', '12px 24px'),
                  fontSize: getFontSize('18px', '16px', '15px', '14px', '13px'),
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  marginBottom: getSpacing('24px', '20px', '16px', '14px', '12px'),
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.background = '#1DA851';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.background = '#25D366';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.3)';
                  }
                }}
              >
                <span style={{ fontSize: getFontSize('20px', '18px', '16px', '14px', '12px') }}>💬</span>
                Hubungi via WhatsApp
              </button>
            )}

            {/* Rating Summary - Real-time data */}
            <ProductRatingSummary 
              productId={id} 
              windowWidth={windowWidth}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>

        {/* Rating Section */}
        <div style={{
          background: 'white',
          borderRadius: getFontSize('24px', '20px', '16px', '14px', '12px'),
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          marginTop: getSpacing('40px', '32px', '28px', '24px', '20px')
        }}>
          {/* Rating Component */}
          <RatingComponent 
            productId={id}
            productName={product?.name || "Produk"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 