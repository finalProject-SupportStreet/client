// import { useContext, useState } from "react";
// import { UserContext } from "../context/userContext.jsx";
import "./home.css";
import Carousel from "./Carousel.jsx";
import { Link } from "react-router-dom";

const StyleExample = () => {
  // const { userData, setUserData } = useContext(UserContext);
  // const [errorMessage, setErrorMessage] = useState("");

  /*  const [formData, setFormData] = useState({
    title: "",
    text: "",
    image: "",
    tags: "",
    privateGroup: false,
  }); */

  /* const handleChange = (e) => {
    setErrorMessage("");
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  }; */

  /* const handleTogglePrivate = () => {
    setFormData((prevData) => ({
      ...prevData,
      privateGroup: !prevData.privateGroup,
    }));
  }; */

  //! Hier fehlt noch die Logik für das Bild-Upload
  /* const handleImageUpload = () => {
    // Hier  Bild-Upload-Logik hinzufügen
    console.log("Bild hochgeladen");
  }; */

  /*   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/createGroup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      // User.groups und LocalStorage aktualisieren (frontend)
      setUserData({ ...userData, groups: [...userData.groups, formData] });

      // Überprüfen, ob die Gruppe(Title) bereits existiert
      if (response.status === 409) {
        const errorMessage = await response.json();
        setErrorMessage(errorMessage.message);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
      setErrorMessage("Gruppenname bereits vergeben.");
    }
  }; */

  return (
    <>
      <section className="relative z-10">
        <Carousel />
      </section>
      <section className="style-test w-auto">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ "--i": 0 }}></div>
          <div className="square" style={{ "--i": 1 }}></div>
          <div className="square" style={{ "--i": 2 }}></div>
          <div className="square" style={{ "--i": 3 }}></div>
          <div className="square" style={{ "--i": 4 }}></div>

          <div className="container mt-64">
            <div className="form">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                Herzlich Willkommen bei Support Street!
              </h2>
              <p className="text-xl mb-6 text-center">
                Bist du bereits Mitglied?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline block custom-text-shadow tracking-wide font-bold"
                >
                  Einloggen
                </Link>
              </p>
              <p className="text-xl mb-4 text-center">
                Bist du neu hier?{" "}
                <a
                  href="/register"
                  className="text-blue-600 hover:underline block tracking-wide font-bold custom-text-shadow"
                >
                  Registrieren
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StyleExample;
