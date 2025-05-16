// components/AuthSelection.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthSelection.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AuthSelection = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => navigate("/guest");

  return (
    <div className="auth-selection-container">
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <h1 id="title">Welcome to TrendTrove</h1>
        <p id="para">
          TrendTrove is your space to explore, express, and engage with what matters most to you. From the latest in fashion and tech to real stories. From trending discussions to insightful opinions, every post adds to a dynamic digital space built by you. No noise, just meaningful content that reflects what’s moving the world today.
        </p>
      </div>

      {/* Informational Paragraph Section */}
      <div className="info-section">
        <p>
          Join a vibrant community where you can share ideas, post your passions, and discover unique content from around the world. Whether you're here to browse, get inspired, or contribute your voice — TrendTrove gives you the tools to stay current and connected.
        </p>
        <p>
         
        </p>
        <span>
          Ready to explore the trends that shape tomorrow?
        </span>
      </div>

      {/* Get Started Button */}
      <div className="hero-buttons bottom-button">
        <button onClick={handleGuestLogin} className="hero-btn guest-btn">Get Started</button>
      </div>

      <Footer />
    </div>
  );
};

export default AuthSelection;
