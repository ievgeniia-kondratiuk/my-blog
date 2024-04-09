import React, { useState, useEffect } from 'react';

//Will contain the form to write and post a new blog
function NewPost({ onAddPost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showPopup, setShowPopup] = useState('');

    //Sets the data needed for to post the blog
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { id: Date.now(), title, content };
        onAddPost(newPost); // This function would be passed down from a parent component or context
        setTitle('');
        setContent('');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        };
 
        //Adds posts to the backend server
        fetch('http://localhost:3001/api/posts', requestOptions)
        .then(response => {

            //if response from backend server is 2xx then it will have a successfull message
            if (response.ok) {
                setShowPopup('Post submitted successfully!');
                setTimeout(() => setShowPopup(''), 3000);

            //if response from backend server failed then it will have an error message
            } else {
                return response.text().then(errorMessage => {
                    setShowPopup(errorMessage);
                    setTimeout(() => setShowPopup(''), 3000);
            })
    }})
        .then(data => {
            onAddPost(data);
            setTitle('');
            setContent('');
        })
 
    };

    return (
    <div className="newPost">
        <h2>Add a New Post</h2>

        {/* Form will ask for title and content which will then get posted */}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
        <button type="submit">Add Post</button>

        {/* Form will check which popup message to include */}
        </form>
        {showPopup && (
                <div className="popup">
                    {showPopup}
                </div>
            )}
            
    </div>
    );
}
export default NewPost;