import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext.jsx";




const NearbyNeighbours = () => {

  const { userData } = useContext(UserContext); 

  // console.log("userData --> ", userData.address[0]);

  const [zipCodeNeighbours, setZipCodeNeighbours] = useState(null);
  

  useEffect(() => {
    const getZipcodeNeighbours = async () => {
      try {

        const response = await fetch('http://localhost:5500/neighbours', {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({zip: userData.address[0].zip}),
        });
        const data = await response.json();
        
        console.log("____________data.zipNeighbours_________________________");
        console.log(data.zipNeighbours);

        setZipCodeNeighbours(data.zipNeighbours);
        console.log("____________zipCodeNeighbours_________________________");
        console.log(zipCodeNeighbours);
      } catch (err) {
        console.log(err);
      }
    };
    getZipcodeNeighbours();
  }, []);

  // useEffect(() => {
  //   console.log('___FOLGENDE USER WURDEN IN DEINEM PLZ GEBIET AN DAS FRONTEND ZURÜCKGESCHICKT --> ', zipCodeNeighbours);
  // }, [zipCodeNeighbours]);

  


  return (
    <>

      <div>
        <p>Nachbarn in deinem PLZ-Bereich: </p>
        <ul>
          {zipCodeNeighbours && zipCodeNeighbours.map((neighbour, i) => {
            return (
            <li key={i}>
              {`${neighbour.firstName} ${neighbour.lastName} (${neighbour.address[0].zip})`};
            </li>
            )
          })};
        </ul>
      </div>
    </>
  );
};

export default NearbyNeighbours;




