import React, { useState, useEffect } from 'react';
import ratingService from '../services/ratingService';

const ProductRatingDisplay = ({ productId, size = 'small' }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRating();
  }, [productId]);

  const fetchRating = async () => {
    try {
      setLoading(true);
      const response = await ratingService.getRatingsByProduct(productId);
      
      if (response.success) {
        const ratingsData = response.data || [];
        const avgRating = ratingService.calculateAverageRating(ratingsData);
        setAverageRating(avgRating);
        setTotalReviews(ratingsData.length);
      } else {
        setAverageRating(0);
        setTotalReviews(0);
      }
    } catch (error) {
      console.error(`Error fetching rating for product ${productId}:`, error);
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
          style={{
            color: i <= rating ? '#ffc107' : '#ddd',
            fontSize: size === 'small' ? '12px' : '14px',
            marginRight: '1px'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: size === 'small' ? '11px' : '12px',
        color: '#999'
      }}>
        <span>★</span>
        <span>...</span>
      </div>
    );
  }

  if (averageRating === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: size === 'small' ? '11px' : '12px',
        color: '#999'
      }}>
        <span>★</span>
        <span>Belum ada rating</span>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: size === 'small' ? '11px' : '12px',
      color: '#666'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {renderStars(Math.round(averageRating))}
      </div>
      <span style={{ fontWeight: '500' }}>
        {averageRating.toFixed(1)}
      </span>
      {totalReviews > 0 && (
        <span style={{ color: '#999' }}>
          ({totalReviews})
        </span>
      )}
    </div>
  );
};

export default ProductRatingDisplay;