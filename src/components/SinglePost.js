import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import "./SinglePost.css";

const SinglePost = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id, currentUser, navigate]);

  const handleLike = async () => {
    const hasLiked = post?.likedBy?.includes(currentUser.id);
    const updatedPost = {
      ...post,
      likes: hasLiked ? post.likes - 1 : post.likes + 1,
      likedBy: hasLiked
        ? post.likedBy.filter((uid) => uid !== currentUser.id)
        : [...(post.likedBy || []), currentUser.id],
    };
    try {
      const res = await axios.put(`http://localhost:4000/posts/${id}`, updatedPost);
      setPost(res.data);
    } catch (err) {
      console.error("Like update failed:", err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), {
        username: currentUser.username,
        text: commentText
      }]
    };
    try {
      const res = await axios.put(`http://localhost:4000/posts/${id}`, updatedPost);
      setPost(res.data);
      setCommentText("");
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const handleLogout = () => navigate("/");

  if (!post) return <p>Loading...</p>;
  const liked = post.likedBy?.includes(currentUser.id);

  return (
    <>
      {/* Navbar */}
   <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm px-4 py-3">

        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/dashboard" className="navbar-brand logo-img m-0">
            <img src="/image1.png" width={200} alt="Logo" className="navbar-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0" id="navbarContent">
          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <Link to="/dashboard">
                <button className="btn btn-outline-light">All Posts</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard">
                <button className="btn btn-outline-light">My Posts</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard">
                <button className="btn btn-outline-light">+ Add Post</button>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                Filter
              </button>
              <ul className="dropdown-menu">
                {["lifestyle", "technology", "fashion", "environment", "news", "all"].map(type => (
                  <li key={type}>
                    <Link to="/dashboard">
                      <button className="dropdown-item">{type.charAt(0).toUpperCase() + type.slice(1)}</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Post Details */}
      <div className="single-post-flat">
        <img src={post.image} alt={post.title} className="post-image-top" />
        <h2 className="flat-title">{post.title}</h2>

        <p className="flat-description">
          {expanded ? post.description : `${post.description.slice(0, 200)}...`}
          {post.description.length > 200 && (
            <span className="toggle-desc" onClick={() => setExpanded(!expanded)}>
              {expanded ? " Show Less" : " Show More"}
            </span>
          )}
        </p>

        <div className="flat-like-row">
          <FontAwesomeIcon
            icon={faHeart}
            className={`flat-heart ${liked ? "liked" : ""}`}
            onClick={handleLike}
          />
          <span>{post.likes} {post.likes === 1 ? "like" : "likes"}</span>
        </div>

        <div className="flat-comment-row">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flat-comment-input"
          />
          <button className="flat-comment-btn" onClick={handleComment}>Post</button>
        </div>

        <div className="flat-comments">
          {post.comments?.map((c, i) => (
            <p key={i}><strong>{c.username}</strong>: {c.text}</p>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SinglePost;
