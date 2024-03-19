import { useState } from "react";

const MitteilungForm = ({ closeModal }) => {
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic); // Korrekt - sollte den Zustand `selectedTopic` aktualisieren
    console.log(topic); // Hilfreich für Debugging-Zwecke
  };

  /******************************************************
   *    Senden des Forms
   * und überprüfung der Länge des Betreffs und der Nachricht
   ******************************************************/

  const validateAndSubmitForm = async (e) => {
    e.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Validierung für 'betreff'
    if (heading.length < 2 || heading.length > 50) {
      setErrorMessage("Der Betreff muss zwischen 2 und 50 Zeichen lang sein.");
      return;
    }

    // Validierung für 'message'
    if (message.length < 2 || message.length > 5000) {
      setErrorMessage(
        "Die Nachricht muss zwischen 2 und 5000 Zeichen lang sein."
      );
      return; // Stoppt die Funktion, wenn die Validierung fehlschlägt
    }

    // Wenn die Validierung erfolgreich ist, fahre mit dem Senden der Daten fort
    setErrorMessage(""); // Bereinigt eventuelle vorherige Fehlermeldungen

    const formData = {
      heading,
      message,
      topic: selectedTopic,
    };
    console.log("FormData aus MitteilungForm", formData);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Post erfolgreich gespeichert");
        // Weiterer Code nach erfolgreicher Speicherung (z.B. Benutzer benachrichtigen, Formular zurücksetzen)
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
              placeholder="Betreff"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              minLength="2"
              maxLength="50"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Deine Nachricht"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              minLength="2"
              maxLength="5000"
              className="w-full h-32 p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-between">
              <ul className="flex justify-between w-full space-x-2">
                <li
                  className={`flex-1 p-2 cursor-pointer border border-gray-300 rounded-md text-center ${
                    selectedTopic === "Allgemein"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                  onClick={() => handleTopicSelection("Allgemein")}
                >
                  Allgemein
                </li>
                <li
                  className={`flex-1 p-2 cursor-pointer border border-gray-300 rounded-md text-center ${
                    selectedTopic === "Frage"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                  onClick={() => handleTopicSelection("Frage")}
                >
                  Frage
                </li>
                <li
                  className={`flex-1 p-2 cursor-pointer border border-gray-300 rounded-md text-center ${
                    selectedTopic === "Aufruf"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                  onClick={() => handleTopicSelection("Aufruf")}
                >
                  Aufruf
                </li>
                <li
                  className={`flex-1 p-2 cursor-pointer border border-gray-300 rounded-md text-center ${
                    selectedTopic === "Hinweis"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black hover:bg-blue-100"
                  }`}
                  onClick={() => handleTopicSelection("Hinweis")}
                >
                  Hinweis
                </li>
              </ul>
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

export default MitteilungForm;
