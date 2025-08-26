import React, { useState, useEffect } from 'react';
import ratingService from '../services/ratingService';
import './ProductRatingSummary.css';

const ProductRatingSummary = ({ productId, windowWidth, refreshTrigger = 0 }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [productId, refreshTrigger]);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await ratingService.getRatingsByProduct(productId);
      
      if (response.success) {
        const ratingsData = response.data || [];
        const avgRating = ratingService.calculateAverageRating(ratingsData);
        
        setRatings(ratingsData);
        setAverageRating(avgRating);
        setTotalReviews(ratingsData.length);
      } else {
        setRatings([]);
        setAverageRating(0);
        setTotalReviews(0);
      }
    } catch (error) {
      console.error(`Error fetching ratings for product ${productId}:`, error);
      setRatings([]);
      setAverageRating(0);
      setTotalReviews(0);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Responsive breakpoints
  const isXLDesktop = windowWidth >= 1440;
  const isLargeDesktop = windowWidth >= 1200;
  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768;
  const isMobile = windowWidth < 768;

  // Dynamic font sizes
  const getFontSize = (xl, lg, md, sm, xs) => {
    if (isXLDesktop) return xl;
    if (isLargeDesktop) return lg;
    if (isDesktop) return md;
    if (isTablet) return sm;
    return xs;
  };

  // Dynamic spacing
  const getSpacing = (xl, lg, md, sm, xs) => {
    if (isXLDesktop) return xl;
    if (isLargeDesktop) return lg;
    if (isDesktop) return md;
    if (isTablet) return sm;
    return xs;
  };

  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
        gap: getSpacing('16px', '14px', '12px', '10px', '8px'),
        marginTop: getSpacing('32px', '28px', '24px', '20px', '16px')
      }}>
        <div style={{
          padding: getSpacing('20px', '18px', '16px', '14px', '12px'),
          background: '#f8f8f8',
          borderRadius: getFontSize('12px', '10px', '8px', '6px', '4px'),
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
            color: '#666',
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            Rating
          </div>
          <div style={{
            fontSize: getFontSize('20px', '18px', '16px', '15px', '14px'),
            fontWeight: '600',
            color: '#333'
          }}>
            Memuat...
          </div>
        </div>
        
        <div style={{
          padding: getSpacing('20px', '18px', '16px', '14px', '12px'),
          background: '#f8f8f8',
          borderRadius: getFontSize('12px', '10px', '8px', '6px', '4px'),
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
            color: '#666',
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            Ulasan
          </div>
          <div style={{
            fontSize: getFontSize('20px', '18px', '16px', '15px', '14px'),
            fontWeight: '600',
            color: '#333'
          }}>
            Memuat...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
      gap: getSpacing('16px', '14px', '12px', '10px', '8px'),
      marginTop: getSpacing('32px', '28px', '24px', '20px', '16px'),
      background: 'white',
      borderRadius: getFontSize('12px', '10px', '8px', '6px', '4px'),
      padding: getSpacing('16px', '14px', '12px', '10px', '8px'),
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }} className="product-rating-summary">
      {/* Rating Summary */}
      <div style={{
        padding: getSpacing('20px', '18px', '16px', '14px', '12px'),
        background: '#f8f8f8',
        borderRadius: getFontSize('12px', '10px', '8px', '6px', '4px'),
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
          color: '#666',
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          Rating
        </div>
        <div style={{
          fontSize: getFontSize('20px', '18px', '16px', '15px', '14px'),
          fontWeight: '600',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {averageRating > 0 ? (
            <>
              <span>{averageRating.toFixed(1)}</span>
              <div className="product-rating-stars">
                {renderStars(Math.round(averageRating))}
              </div>
            </>
          ) : (
            <span>Belum ada rating</span>
          )}
        </div>
      </div>
      
      {/* Reviews Count */}
      <div style={{
        padding: getSpacing('20px', '18px', '16px', '14px', '12px'),
        background: '#f8f8f8',
        borderRadius: getFontSize('12px', '10px', '8px', '6px', '4px'),
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: getFontSize('14px', '13px', '12px', '11px', '10px'),
          color: '#666',
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          Ulasan
        </div>
        <div style={{
          fontSize: getFontSize('20px', '18px', '16px', '15px', '14px'),
          fontWeight: '600',
          color: '#333'
        }}>
          {totalReviews} ulasan
        </div>
      </div>
    </div>
  );
};

export default ProductRatingSummary;