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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Blog from './pages/Blog/Blog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
    <ToastContainer />
    <Routes>
        <Route element={<MainLayout />} >
        <Route exact path="/" Component={Home} />
        <Route path="/sobre" Component={About} /> 
        </Route>
        <Route  path="/videochamada/:roomId" Component={VideoCall} />
        <Route  path="/videochamada" Component={VideoCall} />
         <Route path="/login" Component={Login} />
         <Route path="/cadastro" Component={Register} />
          <Route path='/meuPerfil' Component={MyProfile} />
          <Route path='/EditorBlog' Component={Editor} />
          <Route path='blog' Component={Blog} />
      </Routes>
  </Router>
  </AuthProvider>
);