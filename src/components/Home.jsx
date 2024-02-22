import { useOutletContext } from 'react-router-dom';
import MyDropdown from './DropDown.jsx';

const Home = () => {
  const [loggedIn] = useOutletContext();

  return <p>Hallo! Du bist {loggedIn ? '' : 'nicht'} eingeloggt.</p>;
};
export default Home;