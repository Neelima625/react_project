// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SinglePost from "./components/SinglePost";
import SinglePostGuest from "./components/SinglePostGuest";
import AuthSelection from "./components/AuthSelection";
import GuestPage from "./components/GuestPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Restore user from localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("trendtroveUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthSelection />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/post/:id" element={<SinglePost currentUser={currentUser} />} />
        <Route path="/guestpost/:id" element={<SinglePostGuest />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
