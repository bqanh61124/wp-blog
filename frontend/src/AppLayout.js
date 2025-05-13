import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Login from "./components/Login";
import PostLists from './components/PostLists';
import Post from './components/Post';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Stats from './components/Stats';
import ProtectedRoute from './components/ProtectedRoute';
import './components/Blog.css';

function AppLayout() {
  const [user, setUser] = useState(null);

  const logOut = () => {
    setUser(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-links">
          <div className="nav-left">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/posts" className="nav-link">Posts</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
          <div className="nav-right">
            {user ? (
              <>
                <span className="welcome-message">Welcome, {user.username}</span>
                <Link to="/stats" className="nav-link">Stats</Link>
                <Link to="/newpost" className="nav-link">New Post</Link>
                <button onClick={logOut} className="logout-btn">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Outlet />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
          <Route path=":slug/edit" element={<ProtectedRoute user={user}><EditPost /></ProtectedRoute>} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/stats" element={<ProtectedRoute user={user}><Stats /></ProtectedRoute>} />
        <Route path="/newpost" element={<ProtectedRoute user={user}><NewPost /></ProtectedRoute>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

function Home() {
  return (
    <div className="page-container">
      <h2 className="page-title">Welcome to my blog</h2>
    </div>
  );
}

function About() {
  return (
    <div className="page-container">
      <h2 className="page-title">B22DCDT008-Bùi Quang Anh</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div className="page-container">
      <h2 className="page-title">404 - Page Not Found</h2>
    </div>
  );
}

export default AppLayout;
