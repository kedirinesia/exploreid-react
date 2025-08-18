import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;

  // Mock data based on the screenshot
  const product = {
    id: 7,
    name: "Majapahit Terracotta Sculpture",
    price: "$85",
    location: "Mojokerto, East Java",
    rating: "5.0",
    reviews: "67 reviews",
    badge: "Handcrafted",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "This authentic terracotta sculpture is inspired by the ancient Majapahit kingdom art, handcrafted using traditional techniques passed down through generations. Each piece represents the rich cultural heritage of East Java and showcases the intricate artistry of Indonesian craftsmen.",
    detailedDescription: "The sculpture features detailed motifs and patterns characteristic of Majapahit era artwork, making it a perfect addition to any collection or as a meaningful cultural gift.",
    artisan: {
      name: "Pak Slamet Wijaya",
      title: "Master Ceramicist",
      experience: "With over 30 years of experience in traditional ceramics, Pak Slamet has dedicated his life to preserving the ancient art of Majapahit-inspired terracotta sculpture. His workshop in Mojokerto continues the legacy of his ancestors.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    location_details: {
      name: "Mojokerto Ceramics Village",
      description: "Traditional pottery village in Mojokerto Regency, East Java Province",
      distance: "45 min from Surabaya",
      distance_km: "2.3 km from center"
    }
  };

  return (
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
        padding: isDesktop ? '20px 48px' : isTablet ? '16px 32px' : '16px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        zIndex: 100,
        maxWidth: isDesktop ? '1200px' : '100%',
        margin: '0 auto'
      }}>
        <button 
          onClick={() => window.history.back()}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          ←
        </button>
        <h1 style={{
          fontSize: isDesktop ? '20px' : '16px',
          fontWeight: '600',
          color: '#333',
          margin: 0,
          flex: 1
        }}>
          {isDesktop ? product.name : 'Product Details'}
        </h1>
        <button style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '8px'
        }}>
          📤
        </button>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: isDesktop ? '1200px' : '100%',
        margin: '0 auto',
        paddingTop: '80px'
      }}>

        {/* Desktop Layout */}
        {isDesktop ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            padding: '32px 48px'
          }}>
            {/* Left Column - Image and Gallery */}
            <div>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                {product.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: '#FF9800',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    zIndex: 1
                  }}>
                    {product.badge}
                  </div>
                )}
                <img 
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '16px'
                  }}
                />
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div>
              <div style={{ background: 'white', padding: '32px', borderRadius: '16px', marginBottom: '24px' }}>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 16px 0'
                }}>
                  {product.name}
                </h1>
                
                <div style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  marginBottom: '16px'
                }}>
                  {product.price}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <span style={{ color: '#FF9800' }}>📍</span>
                  <span style={{ color: '#666', fontSize: '16px' }}>{product.location}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {[1,2,3,4,5].map(star => (
                      <span key={star} style={{ color: '#FFD700', fontSize: '18px' }}>⭐</span>
                    ))}
                  </div>
                  <span style={{ color: '#333', fontWeight: '600', fontSize: '16px' }}>
                    {product.rating}
                  </span>
                  <span style={{ color: '#666', fontSize: '16px' }}>
                    ({product.reviews})
                  </span>
                </div>

                <button style={{
                  background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: '16px'
                }}>
                  Add to Cart
                </button>

                <button style={{
                  background: 'transparent',
                  color: '#4CAF50',
                  border: '2px solid #4CAF50',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Contact Seller
                </button>
              </div>

              {/* Description */}
              <div style={{ background: 'white', padding: '32px', borderRadius: '16px', marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Description
                </h3>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '16px',
                  marginBottom: '16px'
                }}>
                  {product.description}
                </p>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  {product.detailedDescription}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Layout */
          <div>
            {/* Product Image */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              {product.badge && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: '#FF9800',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '600',
                  zIndex: 1
                }}>
                  {product.badge}
                </div>
              )}
              <img 
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Product Info */}
            <div style={{ 
              background: 'white', 
              padding: isTablet ? '24px' : '20px', 
              marginBottom: '16px'
            }}>
              <h1 style={{
                fontSize: isTablet ? '28px' : '24px',
                fontWeight: '600',
                color: '#333',
                margin: '0 0 8px 0'
              }}>
                {product.name}
              </h1>
              
              <div style={{
                fontSize: isTablet ? '32px' : '28px',
                fontWeight: 'bold',
                color: '#4CAF50',
                marginBottom: '8px'
              }}>
                {product.price}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#FF9800' }}>📍</span>
                <span style={{ color: '#666', fontSize: '14px' }}>{product.location}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[1,2,3,4,5].map(star => (
                    <span key={star} style={{ color: '#FFD700', fontSize: '16px' }}>⭐</span>
                  ))}
                </div>
                <span style={{ color: '#333', fontWeight: '600', fontSize: '14px' }}>
                  {product.rating}
                </span>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  ({product.reviews})
                </span>
              </div>
            </div>

            {/* Description */}
            <div style={{ 
              background: 'white', 
              padding: isTablet ? '24px' : '20px', 
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '12px'
              }}>
                Description
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                fontSize: '14px',
                marginBottom: '12px'
              }}>
                {product.description}
              </p>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                fontSize: '14px'
              }}>
                {product.detailedDescription}
              </p>
            </div>
          </div>
        )}

        {/* Common Sections for both Desktop and Mobile */}
        <div style={{
          padding: isDesktop ? '0 48px' : isTablet ? '0 32px' : '0 16px'
        }}>

          {/* Meet the Artisan */}
          <div style={{ 
            background: 'white', 
            padding: isDesktop ? '32px' : isTablet ? '24px' : '20px', 
            borderRadius: '16px',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: isDesktop ? '24px' : '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '16px'
            }}>
              Meet the Artisan
            </h3>
            
            <div style={{ 
              display: 'flex', 
              gap: isDesktop ? '20px' : '12px', 
              alignItems: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <img 
                src={product.artisan.image}
                alt={product.artisan.name}
                style={{
                  width: isDesktop ? '80px' : isTablet ? '60px' : '50px',
                  height: isDesktop ? '80px' : isTablet ? '60px' : '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: isMobile ? '0 auto 12px' : 0
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: isDesktop ? '20px' : '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 4px 0'
                }}>
                  {product.artisan.name}
                </h4>
                <p style={{
                  fontSize: isDesktop ? '14px' : '12px',
                  color: '#4CAF50',
                  margin: '0 0 8px 0',
                  fontWeight: '500'
                }}>
                  {product.artisan.title}
                </p>
                <p style={{
                  fontSize: isDesktop ? '16px' : '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  {product.artisan.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Location & Distance */}
          <div style={{ 
            background: 'white', 
            padding: isDesktop ? '32px' : isTablet ? '24px' : '20px', 
            borderRadius: '16px',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: isDesktop ? '24px' : '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '16px'
            }}>
              Location & Distance
            </h3>
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <span style={{ color: '#4CAF50', fontSize: '16px' }}>📍</span>
              <div>
                <h4 style={{
                  fontSize: isDesktop ? '18px' : '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 4px 0'
                }}>
                  {product.location_details.name}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5',
                  margin: '0 0 12px 0'
                }}>
                  {product.location_details.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '4px' : '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px' }}>🚗</span>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      {product.location_details.distance}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px' }}>📏</span>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      {product.location_details.distance_km}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share This Product */}
          <div style={{ 
            background: 'white', 
            padding: isDesktop ? '32px' : isTablet ? '24px' : '20px', 
            borderRadius: '16px',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: isDesktop ? '24px' : '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '16px'
            }}>
              Share This Product
            </h3>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
              gap: '12px'
            }}>
              <button style={{
                background: '#1877F2',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: isDesktop ? '16px' : '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                📘 Facebook
              </button>
              
              <button style={{
                background: '#1DA1F2',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: isDesktop ? '16px' : '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                🐦 Twitter
              </button>
              
              <button style={{
                background: '#25D366',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: isDesktop ? '16px' : '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                💬 WhatsApp
              </button>
            </div>
          </div>

          {/* Report */}
          <div style={{ padding: '0 20px', marginBottom: '20px' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#FF5722',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🚩 Report this product
            </button>
          </div>

          {/* Copyright */}
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999',
            fontSize: '12px'
          }}>
            © 2025 Indonesian Cultural Heritage Marketplace. All rights reserved
          </div>

        </div>

      </div>

      {/* Mobile Bottom Actions */}
      {!isDesktop && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '80px' : '20px',
          left: '16px',
          right: '16px',
          background: 'white',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          display: 'flex',
          gap: '12px',
          zIndex: 100
        }}>
          <button style={{
            flex: 1,
            background: 'transparent',
            color: '#4CAF50',
            border: '2px solid #4CAF50',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Add to Cart
          </button>
          
          <button style={{
            flex: 1,
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Buy Now
          </button>
        </div>
      )}

    </div>
  );
};

export default ProductDetail; 