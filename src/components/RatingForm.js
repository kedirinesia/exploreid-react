import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ratingService from '../services/ratingService';
import './RatingForm.css';

const RatingForm = ({ productId, onRatingSubmitted, existingRating = null, userHasRated = false }) => {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [review, setReview] = useState(existingRating?.review || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Anda harus login untuk memberikan rating');
      return;
    }

    if (rating === 0) {
      setError('Silakan pilih rating terlebih dahulu');
      return;
    }

    if (!review.trim()) {
      setError('Silakan tulis review terlebih dahulu');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      let response;
      
      if (existingRating) {
        // Update existing rating
        response = await ratingService.updateRating(existingRating.id, rating, review);
      } else {
        // Submit new rating
        response = await ratingService.submitRating(user.id, productId, rating, review);
      }

      if (response.success) {
        setSuccess(existingRating ? 'Rating berhasil diperbarui!' : 'Rating berhasil dikirim!');
        setReview('');
        setRating(0);
        
        // Call callback to refresh ratings
        if (onRatingSubmitted) {
          onRatingSubmitted();
        }
      } else {
        setError(response.message || 'Terjadi kesalahan saat mengirim rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError(error.message || 'Terjadi kesalahan saat mengirim rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`star ${i <= rating ? 'filled' : ''}`}
          onClick={() => handleStarClick(i)}
          disabled={isSubmitting}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  if (!isAuthenticated) {
    return (
      <div className="rating-form-container">
        <div className="login-prompt">
          <h3>Berikan Rating & Review</h3>
          <p>Silakan login terlebih dahulu untuk memberikan rating dan review</p>
        </div>
      </div>
    );
  }

  // Jika user sudah pernah rating dan tidak ada existingRating (untuk edit), tampilkan pesan
  if (userHasRated && !existingRating) {
    return (
      <div className="rating-form-container">
        <div className="already-rated-prompt">
          <h3>Anda Sudah Memberikan Rating</h3>
          <p>Anda sudah memberikan rating untuk produk ini. Silakan gunakan tombol "Edit Rating" untuk mengubah rating Anda.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rating-form-container">
      <h3>{existingRating ? 'Edit Rating & Review' : 'Berikan Rating & Review'}</h3>
      
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="rating-input">
          <label>Rating:</label>
          <div className="stars-container">
            {renderStars()}
            <span className="rating-text">
              {rating > 0 && `${rating} dari 5 bintang`}
            </span>
          </div>
        </div>

        <div className="review-input">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Bagikan pengalaman Anda dengan produk ini..."
            rows="4"
            maxLength="500"
            disabled={isSubmitting}
            required
          />
          <div className="character-count">
            {review.length}/500 karakter
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting || rating === 0 || !review.trim()}
        >
          {isSubmitting ? 'Mengirim...' : (existingRating ? 'Perbarui Rating' : 'Kirim Rating')}
        </button>
      </form>
    </div>
  );
};

export default RatingForm;