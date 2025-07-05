import { Navigate } from 'react-router-dom';

export function ProtectedVideoCall({ VideoCall }) {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  console.log(isLoggedIn)
  if (isLoggedIn) {
    return <VideoCall />;
  } else {
    return <Navigate to="/" />;
  }
}
