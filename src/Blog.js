import React, { useState, useEffect } from 'react';

//Will contain the posted blogs
function Blog() {

    const [posts, setPosts] = useState([]);

    //Gets the blogs from backend server
    useEffect(() => {
        fetch('http://localhost:3001/api/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
      },[])
 
    return (
        <div className="blog">
            <h2>Blog Posts</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Blog;