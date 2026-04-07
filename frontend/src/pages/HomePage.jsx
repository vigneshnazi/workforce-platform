import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to Workforce Hiring</h1>
        <p>Connect talented professionals with exciting job opportunities</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/register")}>Find Jobs</button>
          <button className="btn btn-secondary" onClick={() => navigate("/register")}>Post Jobs</button>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Job Matching</h3>
            <p>Our intelligent algorithm matches your skills with the perfect jobs.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Applications</h3>
            <p>Apply to jobs in seconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Quality Candidates</h3>
            <p>Find pre-vetted professionals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Direct Communication</h3>
            <p>Connect without intermediaries.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Verified Reviews</h3>
            <p>Build your reputation with ratings.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Career Growth</h3>
            <p>Track your progress.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up in 2 minutes.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Find Opportunities</h3>
            <p>Browse or post jobs.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Apply or Hire</h3>
            <p>Instantly connect.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Hired</h3>
            <p>Build your reputation.</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <h2 className="section-title">Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Jobs Posted</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2K+</div>
            <div className="stat-label">Successful Hires</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.8★</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join us today</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/register")}>Sign Up</button>
          <button className="btn btn-secondary" onClick={() => window.scrollTo(0, 0)}>Learn More</button>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Workforce Hiring Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}