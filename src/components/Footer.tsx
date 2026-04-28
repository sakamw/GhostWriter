import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-info">
          <div className="logo">
            <span className="logo-icon">✍️</span>
            <span className="logo-text">Founder<span className="gradient-text">Flow</span></span>
          </div>
          <p className="footer-tagline">
            Turning your content into LinkedIn gold with the 1-3-1 Method.
          </p>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FounderFlow. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
