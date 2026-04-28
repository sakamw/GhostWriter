import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isApp = location.pathname === '/app';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <span className="logo-icon">✍️</span>
          <span className="logo-text">Founder<span className="gradient-text">Flow</span></span>
        </Link>
        
        <div className="nav-links">
          {!isApp && (
            <>
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
            </>
          )}
          <Link to="/app" className="btn-primary nav-cta">
            {isApp ? 'Dashboard' : 'Try Free'}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
