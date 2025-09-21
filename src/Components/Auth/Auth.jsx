import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Auth() {
const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate('../pages/Dashboard/Dashboard.jsx', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* <div className="auth-logo">⬢</div> */}
        <h2>Welcome</h2>
        <p>Create an account to get started.</p>

        {/* Toggle buttons */}
        <div className="auth-toggle">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form style={{ backgroundColor:"#111111" }} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your full name" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="hi@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Create a strong password" required />
          </div>
          {/* <br /> */}
          <Link type="submit" to="/dashboard" className="submit-btn">
            {isLogin ? "Sign In" : "Create Account"}
          </Link>
          {/* <br /> <br /> */}
        </form>

        <p className="terms">
          By signing up, you agree to our{" "}
          <a href="#">Privacy Policy</a>, <a href="#">Terms of Service</a>, and{" "}
          <a href="#">Cookie Policy</a>.
        </p>
      </div>
    </div>
  );
}
