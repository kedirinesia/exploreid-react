import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AccommodationDetail = () => {
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
  const isSmallMobile = windowWidth < 480;

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
      .mobile-bottom-actions {
        display: none !important;
      }
    }
  `;

  // Mock data based on the screenshot
  const accommodation = {
    id: 1,
    name: "Rumah Singgah Malang",
    price: "Rp 450,000",
    originalPrice: "Rp 500,000",
    discount: "25% off recently stays",
    rating: 4.7,
    reviews: 127,
    location: "Malang City Center",
    distance: "0.6 km from center",
    type: "/night",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    host: {
      name: "Ibu Dewi Kusuma",
      type: "Superhost",
      responseTime: "Responds within 1 hour",
      hostingYears: "5 years hosting"
    },
    about: "Experience authentic Indonesian hospitality at Rumah Singgah Malang, a charming homestay located in the heart of Malang City. Our traditional Javanese home offers comfortable accommodation with modern amenities.",
    offers: [
      { icon: "📶", label: "Free WiFi" },
      { icon: "❄️", label: "Air Conditioning" },
      { icon: "🍳", label: "Shared Kitchen" },
      { icon: "🥞", label: "Free Breakfast" },
      { icon: "👥", label: "Garden View" },
      { icon: "🅿️", label: "Free Parking" },
      { icon: "🧺", label: "Laundry Service" },
      { icon: "🛡️", label: "24/7 Security" },
      { icon: "🚿", label: "Shared Bathroom" },
      { icon: "👥", label: "Common Area" },
      { icon: "🧳", label: "Luggage Storage" },
      { icon: "🎭", label: "Cultural Tours" }
    ],
    address: "Jl. Kawi No. 15, Klojen, Malang City, East Java 65111, Indonesia",
    nearbyAttractions: [
      { name: "Malang City Square", distance: "0.5 km" },
      { name: "Jodipan Colorful Village", distance: "1.2 km" },
      { name: "Malang Station", distance: "0.8 km" },
      { name: "Sarinah Mall", distance: "0.6 km" },
      { name: "Museum Angkut", distance: "2.1 km" },
      { name: "Tugu Malang", distance: "0.4 km" }
    ],
    houseRules: [
      { icon: "🕐", text: "Check-in: 2:00 PM - 10:00 PM" },
      { icon: "🕚", text: "Check-out: 11:00 AM" },
      { icon: "🚭", text: "No smoking inside the house" },
      { icon: "🎉", text: "No parties or events" },
      { icon: "🕕", text: "Quiet hours: 10:00 PM - 7:00 AM" },
      { icon: "👥", text: "Maximum 4 guests per room" },
      { icon: "👟", text: "Shoes off inside the house" },
      { icon: "🙏", text: "Respect local customs and traditions" }
    ],
    checkInOut: {
      checkIn: "2:00 PM - 10:00 PM",
      checkOut: "11:00 AM",
      selfCheckIn: "Check-in with host greeting",
      cancellation: "Free cancellation up to 24 hours before check-in"
    }
  };

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
            fontSize: isDesktop ? '20px' : isSmallMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#333',
            margin: 0,
            flex: 1,
            lineHeight: '1.2'
          }}>
            {isSmallMobile ? 'Hotel Details' : accommodation.name}
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
            <div className="desktop-layout" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              padding: '32px 48px'
            }}>
              {/* Left Column - Image and Details */}
              <div>
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <img 
                    src={accommodation.image}
                    alt={accommodation.name}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '16px'
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Booking Info */}
              <div>
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', marginBottom: '24px' }}>
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 8px 0'
                  }}>
                    {accommodation.name}
                  </h1>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <span style={{ color: '#FF9800' }}>📍</span>
                    <span style={{ color: '#666', fontSize: '16px' }}>
                      {accommodation.location} · {accommodation.distance}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[1,2,3,4,5].map(star => (
                        <span key={star} style={{ 
                          color: star <= Math.floor(accommodation.rating) ? '#FFD700' : '#E0E0E0', 
                          fontSize: '18px' 
                        }}>⭐</span>
                      ))}
                    </div>
                    <span style={{ color: '#333', fontWeight: '600', fontSize: '16px' }}>
                      {accommodation.rating}
                    </span>
                    <span style={{ color: '#666', fontSize: '16px' }}>
                      ({accommodation.reviews} reviews)
                    </span>
                  </div>

                  {accommodation.discount && (
                    <div style={{
                      background: '#E8F5E8',
                      color: '#4CAF50',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      display: 'inline-block'
                    }}>
                      {accommodation.discount}
                    </div>
                  )}

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      fontSize: '36px',
                      fontWeight: 'bold',
                      color: '#333'
                    }}>
                      {accommodation.price}
                      <span style={{ fontSize: '16px', color: '#666', fontWeight: '400' }}>
                        {accommodation.type}
                      </span>
                    </div>
                    {accommodation.originalPrice && (
                      <div style={{
                        fontSize: '16px',
                        color: '#999',
                        textDecoration: 'line-through'
                      }}>
                        {accommodation.originalPrice}
                      </div>
                    )}
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
                    Reserve Now
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
                    Contact Host
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Layout */
            <div>
              {/* Main Image */}
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <img 
                  src={accommodation.image}
                  alt={accommodation.name}
                  style={{
                    width: '100%',
                    height: isSmallMobile ? '200px' : '250px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Basic Info */}
              <div className="detail-section" style={{ 
                background: 'white', 
                padding: isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
                marginBottom: '16px'
              }}>
                <h1 style={{
                  fontSize: isTablet ? '28px' : isSmallMobile ? '20px' : '24px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 8px 0',
                  lineHeight: '1.2'
                }}>
                  {accommodation.name}
                </h1>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: '#FF9800' }}>📍</span>
                  <span style={{ color: '#666', fontSize: isSmallMobile ? '12px' : '14px' }}>
                    {accommodation.location} · {accommodation.distance}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {[1,2,3,4,5].map(star => (
                      <span key={star} style={{ 
                        color: star <= Math.floor(accommodation.rating) ? '#FFD700' : '#E0E0E0', 
                        fontSize: isSmallMobile ? '14px' : '16px' 
                      }}>⭐</span>
                    ))}
                  </div>
                  <span style={{ color: '#333', fontWeight: '600', fontSize: isSmallMobile ? '12px' : '14px' }}>
                    {accommodation.rating}
                  </span>
                  <span style={{ color: '#666', fontSize: isSmallMobile ? '12px' : '14px' }}>
                    ({accommodation.reviews} reviews)
                  </span>
                </div>

                {accommodation.discount && (
                  <div style={{
                    background: '#E8F5E8',
                    color: '#4CAF50',
                    padding: isSmallMobile ? '4px 8px' : '6px 12px',
                    borderRadius: '8px',
                    fontSize: isSmallMobile ? '10px' : '12px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    display: 'inline-block'
                  }}>
                    {accommodation.discount}
                  </div>
                )}

                <div>
                  <div style={{
                    fontSize: isTablet ? '32px' : isSmallMobile ? '22px' : '28px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>
                    {accommodation.price}
                    <span style={{ fontSize: isSmallMobile ? '12px' : '14px', color: '#666', fontWeight: '400' }}>
                      {accommodation.type}
                    </span>
                  </div>
                  {accommodation.originalPrice && (
                    <div style={{
                      fontSize: isSmallMobile ? '12px' : '14px',
                      color: '#999',
                      textDecoration: 'line-through'
                    }}>
                      {accommodation.originalPrice}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Common Sections for both Desktop and Mobile */}
          <div style={{
            padding: isDesktop ? '0 48px' : isTablet ? '0 32px' : isSmallMobile ? '0 12px' : '0 16px'
          }}>

            {/* Host Information */}
            <div className="detail-section" style={{ 
              background: 'white', 
              padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
              borderRadius: isSmallMobile ? '12px' : '16px',
              marginBottom: '16px'
            }}>
              <div style={{ 
                display: 'flex', 
                gap: isDesktop ? '16px' : isSmallMobile ? '8px' : '12px', 
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: isDesktop ? '60px' : isSmallMobile ? '40px' : '50px',
                  height: isDesktop ? '60px' : isSmallMobile ? '40px' : '50px',
                  borderRadius: '50%',
                  background: '#4CAF50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isDesktop ? '24px' : isSmallMobile ? '16px' : '20px',
                  fontWeight: '600'
                }}>
                  👤
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: isDesktop ? '18px' : isSmallMobile ? '14px' : '16px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 4px 0'
                  }}>
                    Hosted by {accommodation.host.name}
                  </h4>
                  <p style={{
                    fontSize: isDesktop ? '14px' : isSmallMobile ? '10px' : '12px',
                    color: '#4CAF50',
                    margin: '0',
                    fontWeight: '600'
                  }}>
                    {accommodation.host.type}
                  </p>
                </div>
              </div>
              
              <div className="detail-grid" style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                gap: isSmallMobile ? '4px' : '8px',
                fontSize: isDesktop ? '14px' : isSmallMobile ? '11px' : '13px',
                color: '#666'
              }}>
                <div>• {accommodation.host.responseTime}</div>
                <div>• {accommodation.host.hostingYears}</div>
              </div>
            </div>

            {/* About this place */}
            <div className="detail-section" style={{ 
              background: 'white', 
              padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
              borderRadius: isSmallMobile ? '12px' : '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: isDesktop ? '24px' : isSmallMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '16px'
              }}>
                About this place
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                fontSize: isDesktop ? '16px' : isSmallMobile ? '12px' : '14px',
                marginBottom: '16px'
              }}>
                {accommodation.about}
              </p>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#4CAF50',
                fontSize: isDesktop ? '16px' : isSmallMobile ? '12px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline'
              }}>
                Read more
              </button>
            </div>

            {/* What this place offers */}
            <div className="detail-section" style={{ 
              background: 'white', 
              padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
              borderRadius: isSmallMobile ? '12px' : '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: isDesktop ? '24px' : isSmallMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '16px'
              }}>
                What this place offers
              </h3>
              
              <div className="feature-grid" style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
                gap: isDesktop ? '16px' : isSmallMobile ? '8px' : '12px'
              }}>
                {accommodation.offers.map((offer, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSmallMobile ? '8px' : '12px',
                    padding: isSmallMobile ? '4px 0' : '8px 0'
                  }}>
                    <span style={{ fontSize: isDesktop ? '20px' : isSmallMobile ? '16px' : '18px' }}>
                      {offer.icon}
                    </span>
                    <span style={{
                      fontSize: isDesktop ? '16px' : isSmallMobile ? '12px' : '14px',
                      color: '#333'
                    }}>
                      {offer.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Where you'll be */}
            <div className="detail-section" style={{ 
              background: 'white', 
              padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
              borderRadius: isSmallMobile ? '12px' : '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: isDesktop ? '24px' : isSmallMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '16px'
              }}>
                Where you'll be
              </h3>
              
              <div style={{
                background: '#f8f8f8',
                padding: isSmallMobile ? '12px' : '16px',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: isDesktop ? '14px' : isSmallMobile ? '11px' : '13px',
                color: '#666',
                lineHeight: '1.4'
              }}>
                📍 {accommodation.address}
              </div>
            </div>

            {/* Nearby attractions */}
            <div className="detail-section" style={{ 
              background: 'white', 
              padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
              borderRadius: isSmallMobile ? '12px' : '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: isDesktop ? '24px' : isSmallMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '16px'
              }}>
                Nearby attractions
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: isSmallMobile ? '8px' : '12px'
              }}>
                {accommodation.nearbyAttractions.map((attraction, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: isSmallMobile ? '8px 0' : '12px 0',
                    borderBottom: index < accommodation.nearbyAttractions.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}>
                    <span style={{
                      fontSize: isDesktop ? '16px' : isSmallMobile ? '12px' : '14px',
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      🏛️ {attraction.name}
                    </span>
                    <span style={{
                      fontSize: isDesktop ? '14px' : isSmallMobile ? '10px' : '12px',
                      color: '#666'
                    }}>
                      {attraction.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* House rules */}
            <div className="detail-section" style={{ 
              background: 'white', 
              padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
              borderRadius: isSmallMobile ? '12px' : '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: isDesktop ? '24px' : isSmallMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '16px'
              }}>
                House rules
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: isSmallMobile ? '8px' : '12px'
              }}>
                {accommodation.houseRules.map((rule, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSmallMobile ? '8px' : '12px',
                    padding: isSmallMobile ? '4px 0' : '8px 0'
                  }}>
                    <span style={{ fontSize: isDesktop ? '18px' : isSmallMobile ? '14px' : '16px' }}>
                      {rule.icon}
                    </span>
                    <span style={{
                      fontSize: isDesktop ? '16px' : isSmallMobile ? '12px' : '14px',
                      color: '#333'
                    }}>
                      {rule.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Good to know */}
            <div className="detail-section" style={{ 
              background: 'white', 
              padding: isDesktop ? '32px' : isTablet ? '24px' : isSmallMobile ? '16px 12px' : '20px', 
              borderRadius: isSmallMobile ? '12px' : '16px',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: isDesktop ? '24px' : isSmallMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '16px'
              }}>
                Good to know
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
                gap: '16px'
              }}>
                <div>
                  <h4 style={{
                    fontSize: isDesktop ? '16px' : isSmallMobile ? '12px' : '14px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Check-in & Check-out
                  </h4>
                  <div style={{ fontSize: isDesktop ? '14px' : isSmallMobile ? '11px' : '13px', color: '#666', marginBottom: '4px' }}>
                    Check-in: {accommodation.checkInOut.checkIn}
                  </div>
                  <div style={{ fontSize: isDesktop ? '14px' : isSmallMobile ? '11px' : '13px', color: '#666', marginBottom: '4px' }}>
                    Check-out: {accommodation.checkInOut.checkOut}
                  </div>
                  <div style={{ fontSize: isDesktop ? '14px' : isSmallMobile ? '11px' : '13px', color: '#666' }}>
                    Self check-in with host greeting
                  </div>
                </div>
                
                <div>
                  <h4 style={{
                    fontSize: isDesktop ? '16px' : isSmallMobile ? '12px' : '14px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Cancellation policy
                  </h4>
                  <div style={{ fontSize: isDesktop ? '14px' : isSmallMobile ? '11px' : '13px', color: '#666' }}>
                    {accommodation.checkInOut.cancellation}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Bottom Actions */}
        <div className="mobile-bottom-actions" style={{
          position: 'fixed',
          bottom: isMobile ? '80px' : '20px',
          left: isSmallMobile ? '12px' : '16px',
          right: isSmallMobile ? '12px' : '16px',
          background: 'white',
          borderRadius: isSmallMobile ? '12px' : '16px',
          padding: isSmallMobile ? '12px' : '16px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          display: isDesktop ? 'none' : 'flex',
          gap: '12px',
          zIndex: 100
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1
          }}>
            <button style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isSmallMobile ? '8px' : '12px',
              fontSize: isSmallMobile ? '12px' : '14px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              minHeight: isSmallMobile ? '36px' : '40px'
            }}>
              💬 WhatsApp
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1
          }}>
            <button style={{
              background: '#1877F2',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isSmallMobile ? '8px' : '12px',
              fontSize: isSmallMobile ? '12px' : '14px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              minHeight: isSmallMobile ? '36px' : '40px'
            }}>
              📞 Call Now
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default AccommodationDetail; 