// src/Women.jsx
import React, { useState } from 'react';
import './women.css';
import WatchCard from './WatchCard';

/* ----- IMAGES ----- */
import r1 from './assets/women-watch/r1.jpg';
import r2 from './assets/women-watch/r2.jpg';
import r3 from './assets/women-watch/r3.jpg';
import d6 from './assets/women-watch/d6.jpg';
import d2 from './assets/women-watch/d2.jpg';
import d4 from './assets/women-watch/d4.jpg';

/* ----- STATIC DATA ----- */
const watches = [
  { id: 1, brand: 'Rolex', price: 55999, images: [r1, r2, r3] },
  { id: 2, brand: 'Dior', price: 44999, images: [d6, d2, d4] },
  // Add more watches if needed
];

export default function Women() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredWatches = watches.filter((watch) => {
    return (
      (selectedBrand === '' || watch.brand === selectedBrand) &&
      (maxPrice === '' || watch.price <= parseInt(maxPrice))
    );
  });

  return (
    <div className="women-page">
      <h1>Women&rsquo;s Luxury Watches</h1>

      {/* FILTERS */}
      <div className="filters">
        <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
          <option value="">All Brands</option>
          <option value="Rolex">Rolex</option>
          <option value="Dior">Dior</option>
          <option value="Cartier">Cartier</option>
          {/* Add more brands as needed */}
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* WATCH GRID */}
      <div className="watch-grid">
        {filteredWatches.map((watch) => (
          <WatchCard key={watch.id} watch={watch} />
        ))}
      </div>
    </div>
  );
}
