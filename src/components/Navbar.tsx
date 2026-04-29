import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logOut } = useAuth();
  const [imgError, setImgError] = useState(false);
  const isApp = location.pathname === '/app';
  const isAuth = location.pathname === '/auth';

  useEffect(() => {
    setImgError(false);
  }, [user]);

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
          {!isApp && !isAuth && (
            <>
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
            </>
          )}
          
          {user ? (
            <div className="user-menu">
              <Link to="/app" className="btn-secondary nav-cta">Dashboard</Link>
              <div className="user-profile">
                {user.photoURL && !imgError ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="user-avatar" 
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="user-avatar-fallback">
                    {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                  </div>
                )}
                <button onClick={logOut} className="logout-btn" title="Sign Out">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="btn-primary nav-cta">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
