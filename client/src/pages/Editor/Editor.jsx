import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import validationUser from '../../core/validationUser';
import { useNavigate } from 'react-router-dom';


const Editor = () => {

  const navigate = useNavigate()

    useEffect(() => {
      validationUser(navigate)
    }, [navigate])

    const [title, setTitle] = useState()
    const [posts, setPosts] = useState([])
    const addPost = (content) => {
    const novoPost = { id: Date.now(), html: content };
    setPosts([novoPost, ...posts]);
  };
  const [content, setContent] = useState('');


  const handleSubmit = async () => {
    addPost(content);
    setContent(''); 
    await axios.post('http://localhost:8081/postBlog', {
      title: title,
      content: content
    })
  };

    const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link', 'image'], 
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };
 

  return (
    <div>
      <h2>Escreva um post</h2> <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        Publicar
      </button>
    </div>
  );
};

export default Editor;
