import React, { useState, useEffect } from 'react';

function Stats() {
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();
        setPostCount(posts.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post count:", error);
        setError("Failed to fetch post count");
        setLoading(false);
      }
    };

    fetchPostCount();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="stats-container">
      <h2 className="stats-title">Blog Statistics</h2>
      <div className="stats-count">{postCount}</div>
      <p>Total number of posts</p>
    </div>
  );
}

export default Stats; 