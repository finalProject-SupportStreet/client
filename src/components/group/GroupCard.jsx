import { useContext } from "react";
import groupPlaceholderImg from "../assets/groupPlaceholder.jpg";
import { UserContext } from "../context/userContext.jsx";

const GroupCard = ({ group }) => {
  const { title, text, image, privateGroup, members } = group;
  const { userData } = useContext(UserContext);
  // const { adress, groups } = userGroupData;

  /******************************************************
   *    Berechnung Anzahl der Gruppenmitglieder
   ******************************************************/
  const countGroupMembers = () => {
    if (!members || members.length === 0) {
      // Wenn keine Mitglieder vorhanden sind, gib 1 zurück (nur der Administrator)
      return 1;
    } else {
      // Ansonsten zähle die Anzahl der Mitglieder, Moderatoren und Administratoren
      const numMembers = members.filter(
        (member) => member.role === "member"
      ).length;
      const numMods = members.filter(
        (member) => member.role === "moderator"
      ).length;
      const numAdmins = members.filter(
        (member) => member.role === "admin"
      ).length;
      return numMembers + numMods + numAdmins;
    }
  };

  /******************************************************
   *    überprüfung ob User mitglied der Gruppe ist
   ******************************************************/
  //! Muss noch programiert werden
  const isMember = () => {};

  /******************************************************
   *    Wenn kein bild hinterlegt wurde -> Platzhalter nutzen
   ******************************************************/
  //! muss an Cloudinary angeschlossen werden
  const groupImage = () => {
    if (!image) {
      return groupPlaceholderImg;
    } else {
      return image;
    }
  };

  /******************************************************
   *    Ausgabe Private oder Öffentliche Gruppe
   ******************************************************/
  const isPrivate = () => {
    if (privateGroup) {
      return "Privat";
    } else {
      return "Öffentlich";
    }
  };

  /******************************************************
   *    Gruppe Beitreten Button
   ******************************************************/
  const joinGroupBtnHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/followGroup/${group._id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log("response LOG GRUPPE BEITRETEN BTN", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      if (responseData.success) {
        console.log(responseData.message);
      } else {
        throw new Error(responseData.message);
      }

      console.log(userData);
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  return (
    <li key={title} className="border border-black mt-4 p-2 flex">
      {/* Linke Seite */}
      <div className="flex-none w-4/10 mr-4">
        <a href="#">
          <img src={groupImage()} alt="Group Image" className="h-24 w-24" />
        </a>
        <div className="flex items-center mt-2">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            <p>{countGroupMembers()}</p>
          </span>
        </div>
        <span className="text-sm">{isPrivate()}</span>
      </div>

      {/* Mittlere Spalte */}
      <div className="flex-grow mr-4">
        <h2 className="text-lg font-bold mt-2 mb-4">{title}</h2>
        <p>{text}</p>
      </div>

      {/* Rechte Seite */}
      <aside className="flex-none w-1/10">
        {isMember() ? (
          /* Häkchen Icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        ) : (
          <div onClick={joinGroupBtnHandler}>
            {/* Beitreten Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>

            <a href="#">Beitreten</a>
          </div>
        )}
      </aside>
    </li>
  );
};

export default GroupCard;
