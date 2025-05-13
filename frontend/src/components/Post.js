import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Post({ user }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPost(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch post");
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/post/${slug}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        navigate('/posts');
      } catch (error) {
        console.error("Error deleting post:", error);
        setError("Failed to delete post");
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-detail">
      {user && (
        <div className="post-actions">
          <button 
            className="btn-edit"
            onClick={() => navigate(`/posts/${slug}/edit`)}
          >
            Edit
          </button>
          <button 
            className="btn-delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
      <h3 className="post-title">{post.title}</h3>
      <div className="post-meta">
        <span className="post-author">By {post.author}</span>
        <span className="post-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="post-description">{post.description}</p>
      <div className="post-content">{post.content}</div>
    </div>
  );
} 