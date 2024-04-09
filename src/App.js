import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Blog from './Blog';
import NewPost from './components/NewPost';

//Contains the Routes for the listed components
function App() {
  const [posts, setPosts] = useState([]);
  const addPost = (newPost) => {
    setPosts([posts, newPost]);
  };

  
  return (
    <BrowserRouter>
      <nav>
        <ul className='links'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/new-post">Add New Post</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/new-post" element={<NewPost onAddPost={(addPost)} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
