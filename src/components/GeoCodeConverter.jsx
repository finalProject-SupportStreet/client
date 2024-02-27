import { useState, useEffect, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Circle, GeoJSON } from 'react-leaflet';
// import { loadConfigFromFile } from 'vite';


/* WAS HIER PASSIERT:
  1) die Komponente konvertiert die Addresse in Geo-Daten
  2) die Adresse eines(!) Users wird in useEffect gefetched (fetch-URL dementsprechend updaten) und in die drei useStates zipcode, street, number gespeichert
  3) der SendBtnHandler fetched die entsprechenden Geo-Daten von der OSM-API und stellt sie in App.jsx bereit
  4) Ternary Operator in App.jsx rendert Karte nur, wenn Geo-Daten (latitude/longitude) true sind

  EXTRA: 
  - Debounce-Funktion verzögert den Aufruf des sendBtnHandler um 500ms, nachdem der User aufgehört hat zu tippen. Das vermeidet unnötige API_Anfragen, solange noch getippt wird
*/

  //TODO -> map-layer ändern (dark mode) 
  //TODO (wahlweise) -> Legende für Farben (blau/rot) einfügen


const GeoCodeConverter = ({ onCoordinatesChange, onZipcodeChange }) => {

  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //TODO -> über dynamische Id auf eingeloggten user zugreifen 
        const response = await fetch('http://localhost:5500/neighbours/XYZ'); 
        const data = await response.json();
        if (!data) {
          const error = new Error('Couldn`t fetch user');
          throw error;
        }
        setZipcode(data[0].address[0].zip);
        setStreet(data[0].address[0].street);
        setNumber(data[0].address[0].number);
        setLoading(false); 
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  const fetchCoordinates = async () => {
    try {
      const address = `${number} ${street}, ${zipcode}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        onCoordinatesChange(parseFloat(data[0].lat), parseFloat(data[0].lon));
        onZipcodeChange(zipcode);
      } else {
        alert('Address not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSendBtnHandler = useMemo(() => debounce(fetchCoordinates, 500), [number, street, zipcode]);

  // debouncedSendBtnHandler aufrufen, wenn loading "false" wird (nach dem fetch in useEffect)
  useEffect(() => {
    if (!loading) {
      debouncedSendBtnHandler();
    }
  }, [loading]);

  // null returnen, solange Daten laden
  if (loading) {
    return null;
  }

  return null;
};

export default GeoCodeConverter;
