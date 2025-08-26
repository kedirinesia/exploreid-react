import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ratingService from '../services/ratingService';
import './RatingList.css';

const RatingList = ({ productId }) => {
  const { user, isAuthenticated } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  useEffect(() => {
    fetchRatings();
  }, [productId]);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await ratingService.getRatingsByProduct(productId);
      
      if (response.success) {
        setRatings(response.data);
        setAverageRating(ratingService.calculateAverageRating(response.data));
        setRatingDistribution(ratingService.getRatingDistribution(response.data));
      } else {
        setError('Gagal memuat rating');
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setError('Terjadi kesalahan saat memuat rating');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus rating ini?')) {
      return;
    }

    try {
      const response = await ratingService.deleteRating(ratingId);
      
      if (response.success) {
        // Remove the deleted rating from the list
        setRatings(ratings.filter(rating => rating.id !== ratingId));
        
        // Recalculate average and distribution
        const updatedRatings = ratings.filter(rating => rating.id !== ratingId);
        setAverageRating(ratingService.calculateAverageRating(updatedRatings));
        setRatingDistribution(ratingService.getRatingDistribution(updatedRatings));
      } else {
        alert('Gagal menghapus rating');
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
      alert('Terjadi kesalahan saat menghapus rating');
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

  const renderRatingDistribution = () => {
    const totalRatings = ratings.length;
    if (totalRatings === 0) return null;

    return (
      <div className="rating-distribution">
        <h4>Distribusi Rating</h4>
        {[5, 4, 3, 2, 1].map(star => (
          <div key={star} className="distribution-row">
            <span className="star-label">{star} bintang</span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${totalRatings > 0 ? (ratingDistribution[star] / totalRatings) * 100 : 0}%` 
                }}
              ></div>
            </div>
            <span className="count">{ratingDistribution[star]}</span>
          </div>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="rating-list-container">
        <div className="loading">Memuat rating...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rating-list-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="rating-list-container">
      <div className="rating-summary">
        <div className="average-rating">
          <div className="rating-score">
            <span className="score">{averageRating.toFixed(1)}</span>
            <div className="stars">
              {renderStars(Math.round(averageRating))}
            </div>
          </div>
          <div className="rating-count">
            Berdasarkan {ratings.length} rating
          </div>
        </div>
        
        {renderRatingDistribution()}
      </div>

      <div className="ratings-header">
        <h3>Rating & Review ({ratings.length})</h3>
      </div>

      {ratings.length === 0 ? (
        <div className="no-ratings">
          <p>Belum ada rating untuk produk ini. Jadilah yang pertama memberikan rating!</p>
        </div>
      ) : (
        <div className="ratings-list">
          {ratings.map((rating) => (
            <div key={rating.id} className="rating-item">
              <div className="rating-header">
                <div className="user-info">
                  <div className="user-avatar">
                    {rating.userName ? rating.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="user-details">
                    <div className="user-name">
                      {rating.userName || 'User'}
                    </div>
                    <div className="rating-date">
                      {formatDate(rating.createdAt)}
                    </div>
                  </div>
                </div>
                
                <div className="rating-stars">
                  {renderStars(rating.rating)}
                </div>
              </div>
              
              <div className="rating-review">
                {rating.review}
              </div>
              
              {isAuthenticated && user && user.id === rating.userId && (
                <div className="rating-actions">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteRating(rating.id)}
                    title="Hapus rating"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingList;