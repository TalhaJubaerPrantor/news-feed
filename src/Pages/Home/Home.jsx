import React from 'react';
import './Home.css';
import Auth from '../../Components/Auth/Auth';

const Home = () => {
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