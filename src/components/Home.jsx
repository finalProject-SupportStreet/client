// import MyDropdown from './DropDown.jsx';
import { useContext } from 'react';
import { UserContext } from './context/userContext.jsx';

const Home = () => {
  const {isloggedIn} = useContext(UserContext);

  return <p>Hallo! Du bist {isloggedIn ? '' : 'nicht'} eingeloggt.</p>;
};
export default Home;