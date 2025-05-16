import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import AddPost from './AddPost';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import Footer from './Footer';

const Dashboard = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    setShowAddForm(false);
  };

  const handleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);
    const hasLiked = post.likedBy?.includes(currentUser.id);

    const updatedPost = {
      ...post,
      likes: hasLiked ? post.likes - 1 : post.likes + 1,
      likedBy: hasLiked
        ? post.likedBy.filter(id => id !== currentUser.id)
        : [...(post.likedBy || []), currentUser.id]
    };

    await axios.put(`http://localhost:4000/posts/${postId}`, updatedPost);
    setPosts(posts.map(p => (p.id === postId ? updatedPost : p)));
  };

  const toggleDescription = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleFilter = (type) => setFilter(type);
  const handleLogout = () => navigate('/');

  let filteredPosts = posts;
  if (filter === 'my-posts') {
    filteredPosts = posts.filter(post => post.userId === currentUser.id);
  } else if (['lifestyle', 'technology', 'fashion', 'environment', 'news'].includes(filter)) {
    filteredPosts = posts.filter(post => post.filterType === filter);
  }

  return (
    <div className="dashboard-wrapper">
     <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm px-4 py-3">

        <Link className="navbar-brand logo-img" to="/">
          <img src="image1.png" width={200} alt="Trend Trove" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => handleFilter('all')}>All Posts</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => handleFilter('my-posts')}>My Posts</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => setShowAddForm(!showAddForm)}>+ Add Post</button>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">Filter</button>
              <ul className="dropdown-menu">
                {['lifestyle', 'technology', 'fashion', 'environment', 'news', 'all'].map(type => (
                  <li key={type}>
                    <button className="dropdown-item" onClick={() => handleFilter(type)}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
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

      <h2 className="text-center my-4">Welcome, {currentUser.username} 👋</h2>

      {showAddForm && (
        <div className="add-post-overlay" onClick={() => setShowAddForm(false)}>
          <div className="add-post-popup" onClick={(e) => e.stopPropagation()}>
            <AddPost currentUser={currentUser} onPostAdded={handlePostAdded} />
          </div>
        </div>
      )}

      <div className="posts-container">
        {filteredPosts.length === 0 ? (
          <p className="no-posts-message">No posts to display.</p>
        ) : (
          filteredPosts.map(post => {
            const liked = post.likedBy?.includes(currentUser.id);
            const showFull = expandedPosts[post.id];

            return (
              <div className="post-card" key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <img src={post.image} alt={post.title} />
                </Link>

                <div className="post-info">
                  <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{post.title}</h3>
                  </Link>

                  <p className="post-description">
                    {showFull ? post.description : post.description.split(' ').slice(0, 20).join(' ') + '...'}
                    {post.description.split(' ').length > 20 && (
                      <span
                        className="toggle-description"
                        onClick={() => toggleDescription(post.id)}
                      >
                        {showFull ? ' Show less' : ' Show more'}
                      </span>
                    )}
                  </p>
                </div>

                <div className="post-footer">
                  <span>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`heart-icon ${liked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    />{' '}
                    <span>{post.likes}</span>
                  </span>

                  <FontAwesomeIcon
                    icon={faComment}
                    className="comment-icon"
                    onClick={() => navigate(`/post/${post.id}`)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
