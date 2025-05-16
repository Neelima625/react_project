import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GuestPage.css";
import "./SinglePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import CustomAlertModal from "./CustomAlertModal";
import Navbar from "./Navbar";
const GuestPage = () => {
  const [posts, setPosts] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    redirectText: "",
    redirectLink: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  useEffect(() => {
    axios
      .get("http://localhost:4000/posts")
      .then((res) => {
        setPosts([...res.data].reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts");
        setLoading(false);
      });
  }, []);

  const openModal = (message, redirectText, redirectLink, postId) => {
    if (postId) localStorage.setItem("redirectPostId", postId);
    setModalData({ show: true, message, redirectText, redirectLink });
  };

  const closeModal = () => {
    setModalData({ show: false, message: "", redirectText: "", redirectLink: "" });
  };

  const handleInteraction = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    openModal("Please log in to interact with posts.", "Login", "/login", postId);
  };

  if (loading) return <div className="status-message">Loading posts...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
   <> <>
   <Navbar></Navbar>
      {/* <nav className="navbar">
        <Link to="/" className="logo"><img src="image1.png" width={200}></img></Link>
        <div className="nav-buttons">
          <button onClick={handleSignUp} className="nav-btn">Sign Up</button>
          <button onClick={handleLogin} className="nav-btn">Login</button>
        </div>
      </nav> */}

      <div className="guest-container">
        <div className="guest-posts">
          {posts.map((post) => {
            const description = post.description || "";
            const isLongDescription = description.length > 150;
            const shortDescription = description.slice(0, 150);

            return (
              <Link to={`/guestpost/${post.id}`} key={post.id} className="guest-post-card">
                <img src={post.image} alt={post.title} className="guest-post-image" />
                <h3 className="guest-post-title">
                  {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                </h3>

                <p className="guest-post-description">
                  {isLongDescription ? (
                    <>
                      {shortDescription}
                      <Link
                        to={`/guestpost/${post.id}`}
                        className="toggle-description"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ... Read more
                      </Link>
                    </>
                  ) : (
                    description
                  )}
                </p>

                <div className="guest-post-actions">
                  <div className="guest-icon-group">
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={(e) => handleInteraction(e, post.id)}
                      className="icon-button"
                    />
                    <span>{post.likes}</span>
                    <FontAwesomeIcon
                      icon={faComment}
                      onClick={(e) => navigate(`/guestpost/${post.id}`)}
                      className="icon-button"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {modalData.show && (
          <CustomAlertModal
            message={modalData.message}
            redirectText={modalData.redirectText}
            redirectLink={modalData.redirectLink}
            onClose={closeModal}
          />
        )}
      </div>

      
    </><Footer></Footer></>
  );
};

export default GuestPage;
