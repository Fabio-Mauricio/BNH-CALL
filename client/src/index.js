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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
    <ToastContainer />
    <Routes>
        <Route element={<MainLayout />} >
        <Route exact path="/" Component={Home} />
        <Route exact path="/sobre" Component={About} /> 
        </Route>
<<<<<<< HEAD
        <Route exact path="/videochamada/:roomId" Component={VideoCall} />
=======
        <Route exact path="/videochamada" Component={VideoCall} />
>>>>>>> 44be876c5a9a30f430fe53b171c83ffc7d7ce649
         <Route exact path="/login" Component={Login} />
         <Route exact path="/cadastro" Component={Register} />
          <Route exact path='/meuPerfil' Component={MyProfile} />
      </Routes>
  </Router>
  </AuthProvider>
);