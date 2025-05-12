import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds),
      });
      if (response.ok) {
        onLogin && onLogin({ username: creds.username });
        navigate('/stats');
      } else {
        setError("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed!");
    }
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Login</h2>
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input 
          type="text" 
          className="form-input"
          onChange={(e) => setCreds({...creds, username: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password:</label>
        <input 
          type="password" 
          className="form-input"
          onChange={(e) => setCreds({...creds, password: e.target.value})}
        />
      </div>

      <button onClick={handleLogin} className="submit-btn">Login</button>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default Login;
