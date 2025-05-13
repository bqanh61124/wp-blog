import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    description: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to fetch post");
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/post/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      navigate(`/posts/${slug}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={post.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Update Post</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(`/posts/${slug}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 