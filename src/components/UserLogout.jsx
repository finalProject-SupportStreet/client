import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext.jsx';

const UserLogout = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch('http://localhost:5500/logout', {
      method: 'POST',
      credentials: 'include',
    });
    console.log(response);
    setIsLoggedIn(false);
    navigate('/login');
  };
  return <button onClick={logout}>Log Out</button>;
};

export default UserLogout;