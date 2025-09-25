import React, { useEffect } from 'react';
import './Home.css';
import Auth from '../../Components/Auth/Auth';
import { useNavigate } from 'react-router-dom';



const Home = () => {
const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user"); // or "authToken", etc.
    if (user) {
      navigate("/dashboard", { replace: true }); // skip login page
    }
  }, [navigate]);

    return (
        <div className='home-container'>
            <div className='title-container'>
                <span className='glow-title' >High Signal Personal News Feed </span>
            </div>
            <div className='auth-container'>
                <Auth />
            </div>
        </div>
    );
};

export default Home;