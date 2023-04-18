import React from 'react';
import './App.css';
import logo from './logo-white.png';

export const Header = () => {
    return (
        <div className="Header container responsive">
            <img src={logo} className='image' alt='loyalist-college-logo'/>
            CHATBOT ASSISTANT
        </div>
    )
}