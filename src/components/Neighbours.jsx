import Map from "./Map.jsx";

const Neighbours = () => {


  /* 
  - Wenn user auf endpunkt neighours clickt -> mapController
  - im mapController
  */

  // const dataFromLS = localStorage.getItem('userData');
  // const body = 

  
  return (
    <>
      <div className="w-full mt-20">
        <h1>Du und deine Nachbarn: </h1>
        <Map />
      </div>
    </>
  );
};

export default Neighbours;