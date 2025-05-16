// Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Auth.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Signup = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (user.password.length < 8) {
      toast.warning("Password must be at least 8 characters.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:4000/users");
      const existingUser = res.data.find((u) => u.email === user.email);

      if (existingUser) {
        toast.error("User already exists. Try logging in.");
        return;
      }

      const newUser = { ...user, id: Date.now() };
      await axios.post("http://localhost:4000/users", newUser);

      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Something went wrong during signup.");
    }
  };

  return (
    <><Navbar></Navbar><div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 characters)"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    <Footer></Footer></>
  );
};

export default Signup;
