import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRating } from '../context/RatingContext';
import ratingService from '../services/ratingService';
import RatingForm from './RatingForm';
import RatingList from './RatingList';
import './RatingComponent.css';

const RatingComponent = ({ productId, productName = "Produk" }) => {
  const { user, isAuthenticated } = useAuth();
  const { triggerRefresh } = useRating();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userHasRated, setUserHasRated] = useState(false);

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
        
        // Check if current user has already rated this product
        if (isAuthenticated && user) {
          const existingRating = response.data.find(rating => rating.userId === user.id);
          setUserRating(existingRating || null);
          setUserHasRated(!!existingRating);
        } else {
          setUserHasRated(false);
        }
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

  const handleRatingSubmitted = () => {
    fetchRatings();
    setShowForm(false);
    setUserHasRated(true); // Set bahwa user sudah rating
    triggerRefresh(); // Trigger refresh untuk semua komponen rating
  };

  const handleEditRating = () => {
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
  };

  const renderStars = (rating, size = 'medium') => {
    const stars = [];
    const starSize = size === 'large' ? '2rem' : size === 'small' ? '1rem' : '1.5rem';
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
          style={{ fontSize: starSize }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="rating-component">
        <div className="loading">Memuat rating...</div>
      </div>
    );
  }

  return (
    <div className="rating-component">
      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="rating-overview">
          <div className="average-rating">
            <div className="rating-score">
              <span className="score">{averageRating.toFixed(1)}</span>
              <div className="stars">
                {renderStars(Math.round(averageRating), 'large')}
              </div>
            </div>
            <div className="rating-count">
              Berdasarkan {ratings.length} rating
            </div>
          </div>
          
          <div className="rating-actions">
            {isAuthenticated ? (
              userRating ? (
                <div className="user-rating-section">
                  <div className="user-rating-info">
                    <span>Rating Anda: </span>
                    <div className="user-stars">
                      {renderStars(userRating.rating)}
                    </div>
                    <span className="user-rating-text">
                      {userRating.rating} dari 5 bintang
                    </span>
                  </div>
                  <button 
                    className="edit-rating-button"
                    onClick={handleEditRating}
                  >
                    Edit Rating
                  </button>
                </div>
              ) : userHasRated ? (
                <div className="already-rated-message">
                  <p>✅ Anda sudah memberikan rating untuk produk ini</p>
                </div>
              ) : (
                <button 
                  className="rate-button"
                  onClick={() => setShowForm(true)}
                >
                  Berikan Rating
                </button>
              )
            ) : (
              <div className="login-prompt">
                <p>Login untuk memberikan rating</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Form */}
      {showForm && (
        <div className="rating-form-section">
          <RatingForm 
            productId={productId}
            existingRating={userRating}
            userHasRated={userHasRated}
            onRatingSubmitted={handleRatingSubmitted}
          />
          {userRating && (
            <button 
              className="cancel-edit-button"
              onClick={handleCancelEdit}
            >
              Batal Edit
            </button>
          )}
        </div>
      )}

      {/* Rating List */}
      <RatingList 
        productId={productId}
        key={`ratings-${ratings.length}`}
      />
    </div>
  );
};

export default RatingComponent;