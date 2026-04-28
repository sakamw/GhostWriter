import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Section 1: The Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text-area animate-in">
            <h1 className="hero-title">
              Stop spending <span className="gradient-text">4 hours</span> turning your videos into "AI-sounding" LinkedIn posts.
            </h1>
            <p className="hero-subtitle">
              Your content is gold. Your LinkedIn presence is... a full-time job.
            </p>
            <div className="hero-problem-box glass-card">
              <p>
                <strong>The Problem:</strong> You record a great video or write a deep technical doc. You know it should be on LinkedIn, but you don't have time to format it, and ChatGPT makes you sound like a robotic "thought leader" from 2022.
              </p>
            </div>
            <div className="hero-cta-area">
              <Link to="/app" className="btn-primary hero-btn">
                Try the 1-3-1 Ghostwriter Free
              </Link>
              <p className="cta-subtext">No credit card required. 3 posts in 60 seconds.</p>
            </div>
          </div>
          <div className="hero-visual animate-in animate-in-delay-2">
            <div className="visual-card glass-card float-anim">
              <div className="visual-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="visual-body">
                <div className="skeleton line-short"></div>
                <div className="skeleton line-long"></div>
                <div className="skeleton line-mid"></div>
                <div className="visual-stream-box">
                  <div className="stream-pills">
                    <span className="pill">Hook 1</span>
                    <span className="pill active">Hook 2</span>
                    <span className="pill">Hook 3</span>
                  </div>
                  <div className="skeleton line-full"></div>
                  <div className="skeleton line-full"></div>
                  <div className="skeleton line-short"></div>
                </div>
              </div>
            </div>
            <div className="glow-sphere"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Why This is Different */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header align-center animate-in">
            <h2 className="section-title">Built with the <span className="gradient-text">"1-3-1" Architecture</span></h2>
            <p className="section-subtitle">Most AI tools just summarize. We reconstruct.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-card animate-in animate-in-delay-1">
              <div className="feature-icon">🎣</div>
              <h3>Hook Extraction</h3>
              <p>We find the contradiction in your content that stops the scroll. No more boring "In this video..." intros.</p>
            </div>
            
            <div className="feature-card glass-card animate-in animate-in-delay-2">
              <div className="feature-icon">✍️</div>
              <h3>The 1-3-1 Method</h3>
              <p>We format every post for maximum readability: 1 hook, 3 value points, 1 mic drop conclusion.</p>
            </div>
            
            <div className="feature-card glass-card animate-in animate-in-delay-3">
              <div className="feature-icon">🚫</div>
              <h3>Zero-AI Vocabulary</h3>
              <p>Our "Linguistic Filter" automatically strips out 50+ words like 'delve' or 'tapestry' that trigger AI-fatigue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How it Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header align-center animate-in">
            <h2 className="section-title">Watch your content transform in <span className="gradient-text">real-time</span></h2>
          </div>
          
          <div className="steps-container">
            <div className="step-item animate-in animate-in-delay-1">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Paste your link</h3>
                <p>Drop a YouTube URL or blog link. Our Insight Extractor scans for the "gold" instantly.</p>
              </div>
            </div>
            
            <div className="step-item animate-in animate-in-delay-2">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Pick your angle</h3>
                <p>Watch as 3 different "Hook Angles" appear. Choose the one that fits your brand voice best.</p>
              </div>
            </div>
            
            <div className="step-item animate-in animate-in-delay-3">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Watch it build</h3>
                <p>Sit back as the 1-3-1 Body builds itself before your eyes using our multi-stage RxJS engine.</p>
              </div>
            </div>

            <div className="step-item animate-in animate-in-delay-4">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Post & Profit</h3>
                <p>Edit one word (or zero) and hit Post. Content creation that used to take hours now takes 60 seconds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Pricing */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header align-center animate-in">
            <h2 className="section-title">One Plan. <span className="gradient-text">Infinite Leverage.</span></h2>
          </div>
          
          <div className="pricing-card glass-card animate-in">
            <div className="pricing-header">
              <h3 className="plan-name">Founder Pass</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">20</span>
                <span className="period">/ month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li><span className="check">✓</span> Unlimited Content Repurposing</li>
              <li><span className="check">✓</span> LinkedIn, X, and Newsletter Templates</li>
              <li><span className="check">✓</span> The "Anti-AI" Style Filter</li>
              <li><span className="check">✓</span> <strong>Early Adopter Bonus:</strong> Custom templates on request</li>
            </ul>
            <Link to="/app" className="btn-primary pricing-btn">Secure My Founder Price</Link>
          </div>
        </div>
      </section>

      {/* Section 5: Social Proof */}
      <section className="social-proof">
        <div className="container">
          <div className="testimonial glass-card animate-in">
            <p className="quote">
              "I used to ignore my YouTube transcripts because I hated the 'AI flavor' of GPT-4. FounderFlow is the first tool that actually sounds like me after a double espresso."
            </p>
            <div className="author">
              <div className="author-avatar">BN</div>
              <div className="author-meta">
                <p className="author-name">Beta User Name</p>
                <p className="author-title">Founder & Content Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container align-center">
          <h2 className="animate-in">Ready to stop delving and start <span className="gradient-text">winning</span>?</h2>
          <Link to="/app" className="btn-primary animate-in animate-in-delay-1" style={{ marginTop: 'var(--space-8)' }}>
            Start Writing Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
