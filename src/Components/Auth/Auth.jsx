import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, email, password, isLoginForm });

    fetch(`http://localhost:3000/${isLoginForm ? 'login' : 'register'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: isLoginForm ? JSON.stringify({ email, password }) : JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          if (data.status == 200) {
            localStorage.setItem("user", data.user.email);
            // console.log(data.user.email);
            navigate("/dashboard"); // Redirect after login
          } else {
            alert(data.message);
          }
        }
      })
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
            className={isLoginForm ? "active" : ""}
            onClick={() => setIsLoginForm(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={!isLoginForm ? "active" : ""}
            onClick={() => setIsLoginForm(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form style={{ backgroundColor: "#111111" }} onSubmit={handleSubmit}>
          {!isLoginForm && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" onChange={(e) => { setName(e.target.value) }} placeholder="Your full name" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="hi@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Create a strong password" required />
          </div>
          {/* <br /> */}
          <button type="submit" className="submit-btn">
            {isLoginForm ? "Sign In" : "Create Account"}
          </button>
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
