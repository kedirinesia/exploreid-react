import React, { useState, useEffect } from 'react';

const SouvenirsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('HANDICRAFTS');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;

  const products = [
    {
      id: 1,
      name: "Rujak Cingur Traditional Mix",
      price: "Rp 25,000",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "FOOD DELICACIES"
    },
    {
      id: 2,
      name: "Lumping Djahe Sinom Mix",
      price: "Rp 15,000",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d7a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "FOOD DELICACIES"
    },
    {
      id: 3,
      name: "Aneka Soto Blend",
      price: "Rp 20,000",
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "FOOD DELICACIES"
    },
    {
      id: 4,
      name: "Sate Campur Seasoning",
      price: "Rp 18,000",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "FOOD DELICACIES"
    },
    {
      id: 5,
      name: "Perantak Honey Snacks",
      price: "Rp 35,000",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "FOOD DELICACIES"
    },
    {
      id: 6,
      name: "Sambal East Java Ingredients",
      price: "Rp 22,000",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "FOOD DELICACIES"
    },
    {
      id: 7,
      name: "Majapahit Terracotta Sculpture",
      price: "$85",
      rating: "5.0 (67 reviews)",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "HANDICRAFTS",
      badge: "Handcrafted"
    },
    {
      id: 8,
      name: "Keramik Borobudur Relief Set",
      price: "$125",
      rating: "4.8 (45 reviews)",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "HANDICRAFTS"
    },
    {
      id: 9,
      name: "Batik East Java Collection",
      price: "$95",
      rating: "4.9 (89 reviews)",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "HANDICRAFTS"
    },
    {
      id: 10,
      name: "Wayang Kulit Shadow Puppet",
      price: "$180",
      rating: "5.0 (23 reviews)",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "HANDICRAFTS"
    },
    {
      id: 11,
      name: "Traditional Kris Keagger Replica",
      price: "$220",
      rating: "4.7 (34 reviews)",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "HANDICRAFTS"
    }
  ];

  const categories = ['HANDICRAFTS', 'FOOD DELICACIES', 'SOUVENIRS'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5', 
      paddingTop: '60px',
      paddingBottom: '80px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Header with Back Button */}
      <div style={{
        background: 'white',
        padding: isDesktop ? '20px 48px' : isTablet ? '16px 32px' : '16px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
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
          fontSize: isDesktop ? '24px' : isTablet ? '20px' : '18px',
          fontWeight: '600',
          color: '#333',
          margin: 0,
          flex: 1
        }}>
          Souvenirs & Gifts
        </h1>
        <button style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '8px'
        }}>
          🔍
        </button>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: isDesktop ? '1200px' : '100%',
        margin: '0 auto'
      }}>

        {/* Search Bar */}
        <div style={{ 
          background: 'white', 
          padding: isDesktop ? '24px 48px' : isTablet ? '20px 32px' : '16px',
          marginBottom: '16px'
        }}>
          <div style={{
            position: 'relative',
            background: '#f8f8f8',
            borderRadius: '25px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            maxWidth: isDesktop ? '600px' : '100%',
            margin: isDesktop ? '0 auto' : 0
          }}>
            <span style={{ color: '#999', marginRight: '10px' }}>🔍</span>
            <input 
              type="text"
              placeholder="Search souvenirs here you want..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '14px',
                color: '#333'
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ 
          background: 'white', 
          padding: isDesktop ? '24px 48px' : isTablet ? '20px 32px' : '16px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '4px',
            justifyContent: isDesktop ? 'center' : 'flex-start'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  background: selectedCategory === category ? '#4CAF50' : 'transparent',
                  color: selectedCategory === category ? 'white' : '#666',
                  border: selectedCategory === category ? 'none' : '1px solid #ddd',
                  padding: isDesktop ? '12px 24px' : '8px 16px',
                  borderRadius: '20px',
                  fontSize: isDesktop ? '14px' : '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ 
          padding: isDesktop ? '0 48px' : isTablet ? '0 32px' : '0 16px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop 
              ? 'repeat(auto-fit, minmax(300px, 1fr))' 
              : isTablet 
                ? 'repeat(2, 1fr)' 
                : '1fr',
            gap: isDesktop ? '24px' : isTablet ? '20px' : '16px'
          }}>
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => window.location.href = `/product/${product.id}`}
                style={{
                  background: 'white',
                  borderRadius: '16px',
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
                {product.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#FF9800',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '10px',
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
                    height: isDesktop ? '200px' : isTablet ? '180px' : '150px',
                    objectFit: 'cover'
                  }}
                />
                
                <div style={{ 
                  padding: isDesktop ? '20px' : isTablet ? '16px' : '12px'
                }}>
                  <h3 style={{
                    fontSize: isDesktop ? '16px' : '14px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 8px 0',
                    lineHeight: '1.3'
                  }}>
                    {product.name}
                  </h3>
                  
                  {product.rating && (
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>⭐</span>
                      <span>{product.rating}</span>
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: isDesktop ? '16px' : '14px',
                      fontWeight: '600',
                      color: '#4CAF50'
                    }}>
                      {product.price}
                    </span>
                    
                    <button style={{
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      padding: isDesktop ? '8px 16px' : '6px 12px',
                      fontSize: isDesktop ? '12px' : '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              Load More Products
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SouvenirsPage; 