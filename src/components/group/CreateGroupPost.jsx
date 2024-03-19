import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateGroupPost = ({ closeModal }) => {
  const { groupId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    topic: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  /******************************************************
   *    handleChange
   ******************************************************/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Bild-Upload übernimmt jetzt handleChange
  /* const handleImageUpload = (e) => {
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImg(reader.result);
    };
    reader.readAsDataURL(image);
  }; */

  /******************************************************
   *    Senden des Forms
   * und überprüfung der Länge des Betreffs und der Nachricht
   ******************************************************/

  const validateAndSubmitForm = async (e) => {
    e.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Deine Validierungslogik
    if (formData.title.length < 2 || formData.title.length > 50) {
      setErrorMessage("Der Betreff muss zwischen 2 und 50 Zeichen lang sein.");
      return;
    }

    if (formData.text.length < 2 || formData.text.length > 5000) {
      setErrorMessage(
        "Die Nachricht muss zwischen 2 und 5000 Zeichen lang sein."
      );
      return;
    }

    setErrorMessage(""); // Bereinigt eventuelle vorherige Fehlermeldungen

    console.log("Absendendes FormData", formData);

    try {
      const response = await fetch(
        `http://localhost:5500/createGroupPost/${groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Post erfolgreich gespeichert");
        closeModal(); // Schließt das Formular/Modal nach dem erfolgreichen Absenden
      } else {
        console.error("Fehler beim Speichern des Posts");
        setErrorMessage("Es gab ein Problem beim Speichern Ihres Posts.");
      }
    } catch (error) {
      console.error("Fehler beim Senden der Daten", error);
      setErrorMessage("Es gab ein Problem beim Senden Ihrer Daten.");
    }
  };

  return (
    <div className="border max-w-lg mx-auto my-8">
      <section className="border p-4">
        <header className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">Wähle eine Option: </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={closeModal} // Verwende diese Funktion zum Schließen des Modal/Formular
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </header>
        <section>
          <form onSubmit={validateAndSubmitForm} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Betreff"
              value={formData.title}
              onChange={handleChange}
              minLength="2"
              maxLength="50"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Deine Nachricht"
              name="text"
              value={formData.text}
              onChange={handleChange}
              minLength="2"
              maxLength="5000"
              className="w-full h-32 p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-between">
              <ul className="flex justify-between w-full space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, topic: "Allgemein" })
                  }
                >
                  Allgemein
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, topic: "Frage" })}
                >
                  Frage
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, topic: "Aufruf" })}
                >
                  Aufruf
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, topic: "Hinweis" })}
                >
                  Hinweis
                </button>
              </ul>
            </div>
            {/* HIER NOCH ANSCHLIE?EN */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-800"
              >
                Bild hochladen
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 px-4 py-2 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Absenden
              </button>
            </div>
          </form>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </section>
    </div>
  );
};

export default CreateGroupPost;
