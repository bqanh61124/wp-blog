import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h2 className="page-title">Blog Posts</h2>
      <ul className="post-list">
        {data.map((d) => (
          <li key={d.slug} className="post-item">
            <Link to={`/posts/${d.slug}`}>
              <h3 className="post-title">{d.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
