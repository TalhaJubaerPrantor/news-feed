import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { app } from "../Firebase/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


export default function Auth() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [popUpLoading,setPopUpLoading]=useState(false);

  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()
  const handleGoogleLogin = async () => {
    try {
      setPopUpLoading(true)
      const user = await signInWithPopup(auth, googleProvider);
      if (user) {
        // _tokenResponse.email
        fetch(`https://news-feed-b.vercel.app/googledetails`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: isLoginForm ? JSON.stringify({ name: user._tokenResponse.fullName, email: user._tokenResponse.email, password: "" }) : JSON.stringify({ name, email, password })
        })
          .then(res => res.json())
          .then(data => {
            if (data.status == 200) {
              localStorage.setItem("user", data.user.email);
      setPopUpLoading(false)
              navigate("/dashboard"); // Redirect after login
            }
          })
      }

    } catch (error) {
      console.log(error);
    }
  }


  // Email and password login
  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true)
    fetch(`https://news-feed-b.vercel.app/${isLoginForm ? 'login' : 'register'}`, {
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
            setAuthLoading(false)
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
            {isLoginForm ?
              authLoading ? "Loading" : "Sign In"
              :
              authLoading ? "Loading" : "Create Account"}
          </button>
          {/* <br /> <br /> */}
        </form>
        <p style={{ textAlign: "center" }}>Or</p>
        {/* <button onClick={() => handleGoogleLogin()}>Google SignIn</button> */}

        <button className="google-btn" onClick={() => handleGoogleLogin()}>
          <FontAwesomeIcon icon={faGoogle} />
          <span className="google-text">{popUpLoading?"Loading":"Continue with Google"}</span>
        </button>

        <p className="terms">
          By signing up, you agree to our{" "}
          <a href="#">Privacy Policy</a>, <a href="#">Terms of Service</a>, and{" "}
          <a href="#">Cookie Policy</a>.
        </p>
      </div>
    </div>
  );
}
