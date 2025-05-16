import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./AddPost.css";

const AddPost = ({ currentUser, onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image || !filterType) {
      toast.warn("Please fill out all fields.");
      return;
    }

    const newPost = {
      title,
      description,
      image,
      userId: currentUser.id,
      username: currentUser.username,
      likes: 0,
      likedBy: [],
      comments: [],
      filterType,
    };

    try {
      const response = await axios.post('http://localhost:4000/posts', newPost, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success("Post added successfully!");
      onPostAdded(response.data);

      // Clear form
      setTitle('');
      setDescription('');
      setImage('');
      setFilterType('');
    } catch (err) {
      console.error('Error adding post:', err);
      toast.error("Failed to add post. Please try again.");
    }
  };

  return (
    <div className="add-post-container">
      <h3>Add New Post</h3>
      <form onSubmit={handleSubmit} className="add-post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="technology">Technology</option>
          <option value="fashion">Fashion</option>
          <option value="environment">Environment</option>
          <option value="education">Education</option>
          <option value="news">News</option>
        </select>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
