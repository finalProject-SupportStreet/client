import { useOutletContext } from "react-router-dom";
// import MyDropdown from "./DropDown.jsx";
import Options from "./OptionsMenu.jsx"
const Home = () => {
  const [loggedIn] = useOutletContext();

  return (
  <>
  <p>Hallo! Du bist {loggedIn ? "" : "nicht"} eingeloggt.</p>
  <Options>Test</Options>
  </>
  )
};
export default Home;
