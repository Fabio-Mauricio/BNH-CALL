import { Navigate } from 'react-router-dom';

export function ProtectedEditor({Editor}) {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  if (isLoggedIn) {
    return <Editor />;
  } else {
    return <Navigate to="/" replace />;
  }
}