import React from "react";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="post-card" onClick={handleClick}>
      <img src={post.image} alt={post.title} className="post-image" />
      <div className="post-info">
        <h3>{post.title}</h3>
        <p>{post.description.slice(0, 60)}...</p>
      </div>
    </div>
  );
};

export default PostCard;
