import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './watchDetail.css';

export default function WatchDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Always call hooks at the top
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  // ✅ Then extract state safely
  const watch = location?.state?.watch;

  if (!watch) {
    navigate('/women');
    return null;
  }

  const { brand, price, images } = watch;

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-container">
        <div className="image-section">
          <button className="nav left" onClick={prev}>‹</button>
          <img src={images[index]} alt={`${brand} watch`} />
          <button className="nav right" onClick={next}>›</button>
          <button
            className={`wishlist-btn ${wishlist ? 'active' : ''}`}
            onClick={() => setWishlist(!wishlist)}
          >{wishlist ? '♥' : '♡'}</button>
        </div>
        <div className="info-section">
          <h1>{brand}</h1>
          <p className="price">₹{price}</p>
          <div className="qty-add">
            <div className="qty-selector">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className="add-cart">Add to Cart</button>
          </div>
          <div className="description">
            <h3>Product Details</h3>
            <p>This exquisite {brand} watch features premium materials, elegant design, and Swiss craftsmanship. Perfect for those seeking timeless elegance and precision.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
