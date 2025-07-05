import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import VideoCall from './pages/VideoCall/VideoCall';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MainLayout from './components/MainLayout/MainLayout';
import MyProfile from './pages/myProfile/MyProfile';
import { ToastContainer } from 'react-toastify'; 
import { AuthProvider } from './context/UserContext';
import Editor from './pages/Editor/Editor';
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Blog from './pages/Blog/Blog';
import { ProtectedEditor } from './ProtectedEditor';
import { ProtectedVideoCall } from './ProtectedVideoCall';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
    <ToastContainer />
    <Routes>
        <Route element={<MainLayout />} >
        <Route exact path="/" element={<Home />} />
        <Route path="/sobre" element={<About/>} /> 
        </Route>
        <Route  path="/videochamada/:roomId" element={ProtectedVideoCall(VideoCall)} />
        <Route  path="/videochamada" element={ProtectedVideoCall(VideoCall)}  />
         <Route path="/login" element={<Login />} />
         <Route path="/cadastro" element={<Register/>} />
          <Route path='/meuPerfil' element={<MyProfile/>} />
          <Route path='/EditorBlog' element={ProtectedEditor(Editor)} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/contato' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
      </Routes>
  </Router>
  </AuthProvider>
);