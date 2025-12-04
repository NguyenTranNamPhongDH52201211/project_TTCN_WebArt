// src/components/SignupPage.jsx
import React from 'react';
import './SignUpPage.css';
import { FiEyeOff, FiGoogle, FiTwitter, FiMoon } from 'react-icons/fi';

const SignUpPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-form-side">
        <a href="/dashboard" className="back-link">&lt; Back to dashboard</a>
        <h1>Sign Up</h1>
        <p>Enter your email and password to sign up!</p>
        <div className="social-buttons">
          <button className="social-button google">
            <FiGoogle className="social-icon" />
            Sign up with Google
          </button>
          <button className="social-button x">
            <FiTwitter className="social-icon" />
            Sign up with X
          </button>
        </div>
        <div className="or-divider">Or</div>
        <form className="auth-form">
          <div className="form-group half">
            <label>First Name*</label>
            <input type="text" placeholder="Enter your first name" />
          </div>
          <div className="form-group half">
            <label>Last Name*</label>
            <input type="text" placeholder="Enter your last name" />
          </div>
          <div className="form-group">
            <label>Email*</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password*</label>
            <div className="password-input">
              <input type="password" placeholder="Enter your password" />
              <FiEyeOff className="password-icon" />
            </div>
          </div>
          <label className="checkbox-label terms">
            <input type="checkbox" />
            By creating an account means you agree to the Terms and Conditions, and our Privacy Policy
          </label>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <p className="switch-link">Already have an account? <a href="/login">Sign In</a></p>
      </div>
      <div className="auth-banner-side">
        <div className="logo">
          <div className="logo-icon">||</div>
          <span className="logo-text">TailAdmin</span>
        </div>
        <p className="banner-description">Free & Open-Source Tailwind CSS Admin Dashboard Template</p>
        <FiMoon className="moon-icon" />
      </div>
    </div>
  );
};

export default SignUpPage;