// src/WatchCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './women.css'; // styles in one place

export default function WatchCard({ watch }) {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const [wishlist, setWishlist] = useState(false);
 
  const nextImage = () =>
    setImageIndex((imageIndex + 1) % watch.images.length);

  const prevImage = () =>
    setImageIndex((imageIndex - 1 + watch.images.length) % watch.images.length);

  return (
    <div className="watch-wrapper">
      {/* Main card */}
      <div
        className="watch-card"
        onClick={() => navigate(`/watch/${watch.id}`, { state: { watch } })}
      >
        <button
          className={`wishlist-btn ${wishlist ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setWishlist(!wishlist);
          }}
        >
          {wishlist ? '♥' : '♡'}
        </button>

        <div className="image-gallery">
          <button
            className="nav left"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <img src={watch.images[imageIndex]} alt={`${watch.brand} Watch`} />

          <button
            className="nav right"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Brand & Price BELOW the card */}
      <div className="watch-info">
        <h3>{watch.brand}</h3>
        <p>₹{watch.price}</p>
      </div>
    </div>
  );
}
