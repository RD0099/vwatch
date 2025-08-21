// src/Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import heroImg from './assets/hero-photos/h5.png';
import img1 from './assets/hero-photos/b4.jpeg';
import img2 from './assets/hero-photos/b1.jpeg';
import img3 from './assets/hero-photos/b2.jpeg';
import img4 from './assets/hero-photos/b3.jpeg';
import img5 from './assets/hero-photos/b6.jpeg';

export default function Home() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  /* scroll‑fade observer */
  const gridRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.15 }
    );
    gridRef.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="homepage">
      {/* NAVBAR */}
      <header className="vw-nav">
        <div className="text-logo">VWatch</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/register">Registration</Link>
          <Link to="/login">Login</Link>
          <Link to="/logout">LOgout</Link>
        </nav>

        <div className="search-bar">
          <input type="text" placeholder="Search watches…" />
          <button>🔍</button>
        </div>

        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          {dark ? '🌞' : '🌙'}
        </button>
      </header>

      {/* HERO */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-text slide-down">
          <h1>Elegance<br />Reimagined</h1>
          <p>Where Time Meets Style</p>
          <div className="hero-btns">
            <Link to="/tryon" className="btn white">Try Now</Link>
            <Link to="/catalog" className="btn outline">Browse</Link>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="grid-section">
        <div className="grid-wrap" ref={gridRef}>
          {[
            { src: img1, category: 'Couple',   link: '/men' },
            { src: img2, category: 'Women', link: '/women' },
            { src: img3, category: 'Men',  link: '/kids' },
            { src: img4, category: 'Kids',link: '/couple' },
            { src: img5, category: 'Smart', link: '/smart' }
          ].map((item, i) => (
            <figure key={i} className={`grid-item fade-up ${i === 0 ? 'span-2-rows' : ''}`}>
              <img src={item.src} alt={`${item.category} watch`} />
              <figcaption className="overlay">
                <div className="overlay-content">
                  <span className="category-label">{item.category}</span>
                  <Link to={item.link} className="shop-link">Explore</Link>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="logo-text">VWatch</div>
          <p>Contact: +91 9876543210</p>
          <p>Email: support@vwatch.com</p>
          <p>Address: 123 VWatch Lane, Mumbai</p>
          <p>Instagram: <a href="https://instagram.com/vwatch" target="_blank" rel="noreferrer">@vwatch</a></p>
        </div>
      </footer>
    </div>
  );
}
