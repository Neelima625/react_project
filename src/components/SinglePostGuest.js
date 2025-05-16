import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom'
import Footer from "./Footer";
import "./SinglePost.css"; // Use only this for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import CustomAlertModal from "./CustomAlertModal";
import Navbar from "./Navbar";


const SinglePostGuest = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const [modalData, setModalData] = useState({
    show: false,
    message: "",
    redirectText: "",
    redirectLink: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  const handleSignUp = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  const handleInteraction = () => {
    setModalData({
      show: true,
      message: "Please log in to interact with posts.",
      redirectText: "Login",
      redirectLink: "/login",
    });
  };

  const handleComment = () => {
    setModalData({
      show: true,
      message: "Sign up or log in to post comments.",
      redirectText: "Signup",
      redirectLink: "/signup",
    });
  };

  const closeModal = () => {
    setModalData({
      show: false,
      message: "",
      redirectText: "",
      redirectLink: "",
    });
  };

  if (!post) return <div className="status-message">Loading post...</div>;

  const descriptionLines = post.description.split("\n");
  const limitedDescription = descriptionLines.slice(0, 3).join("\n");
  const showToggle = descriptionLines.length > 3;

  return (
    <><Navbar></Navbar>
     
        <div className="single-post-flat">
          
            <img className="post-image-top"
              src={post.image}
              alt={post.title}
            
            />
            <h2 className="flat-title">
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </h2>
            <p className="flat-description">
              {expanded ? post.description : limitedDescription}
              {showToggle && (
                <button
                  className="toggle-description"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? " Show less" : " Show more"}
                </button>
              )}
            </p>
          

          <div className="flat-like-row">
            
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "gray", cursor: "pointer" }}
                onClick={handleInteraction}
              />
              <span>{post.likes}</span>
              </div>
              
             
            

            <div className="flat-comment-row">
              <input
            type="text"
            placeholder="Write a comment..."
           
            className="flat-comment-input"
          />
           <button className="flat-comment-btn" onClick={handleComment}>
                Add Comment
              </button>
              </div>
              <div className="flat-comments"> 
                {post.comments.map((comment, idx) => (
                    <p key={idx}>
                      <strong>{comment.username}:</strong> {comment.text}
                    </p>
                  ))}
             
            </div>
          
        </div>

        

        {modalData.show && (
          <CustomAlertModal
            message={modalData.message}
            redirectText={modalData.redirectText}
            redirectLink={modalData.redirectLink}
            onClose={closeModal}
          />
        )}
       <Footer />
    </>
  );
};

export default SinglePostGuest;
