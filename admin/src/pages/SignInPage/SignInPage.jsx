// src/components/LoginPage.jsx
import React from 'react';
import './SignInPage.css';
import { FiEyeOff } from 'react-icons/fi'; // For password hide/show, adjust if needed
import { FiGoogle, FiTwitter,FiMoon } from 'react-icons/fi'; // Adjust icons for Google and X

const SignInPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-form-side">
        <a href="/dashboard" className="back-link">&lt; Back to dashboard</a>
        <h1>Sign In</h1>
        <p>Enter your email and password to sign in!</p>
        <div className="social-buttons">
          <button className="social-button google">
            <FiGoogle className="social-icon" />
            Sign in with Google
          </button>
          <button className="social-button x">
            <FiTwitter className="social-icon" /> {/* X icon, use FiTwitter as proxy or replace */}
            Sign in with X
          </button>
        </div>
        <div className="or-divider">Or</div>
        <form className="auth-form">
          <div className="form-group">
            <label>Email*</label>
            <input type="email" placeholder="info@gmail.com" />
          </div>
          <div className="form-group">
            <label>Password*</label>
            <div className="password-input">
              <input type="password" placeholder="Enter your password" />
              <FiEyeOff className="password-icon" />
            </div>
          </div>
          <div className="options">
            <label className="checkbox-label">
              <input type="checkbox" />
              Keep me logged in
            </label>
            <a href="/forgot-password" className="forgot-link">Forgot password?</a>
          </div>
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        <p className="switch-link">Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
      <div className="auth-banner-side">
        <div className="logo">
          <div className="logo-icon">||</div>
          <span className="logo-text">WebArt</span>
        </div>
        <p className="banner-description">Free & Open-Source Tailwind CSS Admin Dashboard Template</p>
        <FiMoon className="moon-icon" /> {/* Moon icon */}
      </div>
    </div>
  );
};

export default SignInPage;