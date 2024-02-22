import { useNavigate, useOutletContext } from 'react-router-dom';

const UserLogout = () => {
  const [, setLoggedIn] = useOutletContext();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch('http://localhost:5500/logout', {
      method: 'POST',
      credentials: 'include',
    });
    console.log(response);
    setLoggedIn(false);
    navigate('/login');
  };
  return <button onClick={logout}>Log Out</button>;
};

export default UserLogout;