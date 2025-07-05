export default function validationUser(navigate) {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/');
  }
}
