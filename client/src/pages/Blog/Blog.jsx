import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Blog() {
   const [posts, setPosts] = useState([])
     useEffect(() => {
      const getPosts = async () => {
        await axios.get('http://localhost:8081/getPosts')
    .then((response) => {
      setPosts(response.data)
    }).catch((err) => {
      console.log(err)
    })
      }
    getPosts()
    console.log(posts)
  }, [])

  useEffect(() => {
  console.log('Posts atualizados:', posts);
}, [posts]);  

  const addPost = (content) => {
    const novoPost = { id: Date.now(), html: content };
    setPosts([novoPost, ...posts]);
  };

  return (
    <div style={{ padding: '2rem' }}>

      <hr />
      
      <h2>Posts Publicados</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ))}
    </div>
  );
}

export default Blog;
