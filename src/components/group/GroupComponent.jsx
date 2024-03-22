import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "../context/groupsContext.jsx";
// import { UserContext } from "../context/userContext.jsx";
import { useContext, useEffect, useState } from "react";
import groupPlaceholderImg from "../assets/groupPlaceholder.jpg";
// import CreatePost from "../mainComponents/createPost-Components/CreatePost.jsx";
import { Modal } from "../mainComponents/createPost-Components/Modal.jsx";
import CreateGroupPost from "./CreateGroupPost.jsx";
import GroupPostCard from "./GroupPostCard.jsx";
// import GroupPostCard from "./GroupPostCard.jsx";

const GroupComponent = () => {
  const { groupId } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const { groupsData, isLoading } = useContext(GroupsContext);
  // const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(groupsData);
  console.log(groupId);

  // Die Logik zum Finden deiner Gruppe basierend auf `groupId`
  const group = groupsData.find((group) => group._id === groupId);
  console.log("group in GroupComponent", group);
  const [groupPosts, setGroupPosts] = useState(group.groupPosts || []); //! Browser meint hier ist der fehler

  /******************************************************
   *    useEffect für setGroupPosts
   ******************************************************/

  useEffect(() => {}, [groupPosts]);

  /* *****************************************************
   *    Gruppenkommentare laden (funzt eventuell garnicht?!)
   ******************************************************/
  if (isLoading) {
    return <div>Lädt...</div>; // Zeige eine Ladeanzeige
  }

  if (!groupsData) {
    return <div>Keine Daten verfügbar.</div>; // Fallback, falls keine Daten geladen werden konnten
  }

  const {
    /* title, text, admins, mods, members, privateGroup, comments,  */ image,
  } = group;
  console.log("group in Component", group);

  /******************************************************
   *    img
   ******************************************************/
  // ! Cloudenary Anbindung fehlt noch
  const groupImg = () => {
    if (image === "") {
      return groupPlaceholderImg;
    } else {
      return image;
    }
  };

  /******************************************************
   *    Details ein und ausblenden
   ******************************************************/
  const detailsHandler = () => {
    setShowDetails(!showDetails);
  };

  /******************************************************
   *    mods, Admins und Members Namen formatieren
   ******************************************************/
  const formatNamesList = (users) => {
    // Überprüfe, ob das übergebene Array gültig ist
    if (!Array.isArray(users) || users.length === 0) {
      return "Keine Benutzer vorhanden";
    }

    // Gehe durch jedes Benutzerobjekt im Array und formatiere den Namen
    const formattedNames = users.map((user) => {
      // Extrahiere den Vornamen und den ersten Buchstaben des Nachnamens
      const firstName = user.firstName || "";
      const lastNameInitial = user.lastName
        ? user.lastName.charAt(0) + "."
        : "";
      return `${firstName} ${lastNameInitial}`;
    });

    // Verbinde die formatierten Namen zu einem String
    return formattedNames.join(", ");
  };

  /******************************************************
   *    privateGroup
   ******************************************************/
  const isPrivate = () => {
    const status = group.privateGroup;
    if (status) {
      return "Private Gruppe";
    } else {
      return "Öffentliche Gruppe";
    }
  };

  /******************************************************
   *    Modal (create Post in extra Fenster anzeigen)
   ******************************************************/

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Umschließender Container für alles, setzt die maximale Breite und zentriert den Inhalt */}
      <div className="max-w-5xl mx-auto">
        {/* Container für die Gruppeninformationen */}
        <div className="mt-10">
          <Link to={`/groups`}>
            <p className="pb-5 text-center">Zurück zur Gruppenübersicht</p>
          </Link>
          <div className="border p-2">
            <h3 className="border p-2 mb-2">{group.title}</h3>
            <img src={groupImg()} alt="Gruppenbild" className="mb-4 mx-auto" />

            {/* Details und Menü */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <button
                  onClick={detailsHandler}
                  className="border p-2 cursor-pointer flex-grow"
                >
                  {!showDetails ? "Details einblenden" : "Details ausblenden"}
                </button>
                <button className="border p-2">Menü</button>
              </div>

              {/* Weitere Details anzeigen, falls erforderlich */}
              {showDetails && (
                <div>
                  <p className="border p-2 mb-2">{group.text}</p>
                  <p className="border p-2 mb-2">
                    Admins: {formatNamesList(group.admins)}
                  </p>
                  <p className="border p-2 mb-2">
                    Mods: {formatNamesList(group.mods)}
                  </p>
                  <p className="border p-2 mb-2">
                    Mitglieder: {formatNamesList(group.members)}
                  </p>
                </div>
              )}
            </div>

            {/* Tags und Privatsphäre-Status */}
            <div className="border p-2 flex justify-between">
              <span>{isPrivate()}</span>
              <span>{group.tags}</span>
            </div>
          </div>

          {/* Sektion für neue Nachricht */}
          <section onClick={openModal} className="border p-2 my-4">
            <div className="flex items-center">
              <img
                src="#"
                alt="Profilbild Nutzer"
                className="border p-2 w-1/5"
              />
              <input
                type="text"
                className="flex-auto ml-2 border p-2"
                placeholder="Deine Nachricht..."
              />
            </div>
          </section>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <CreateGroupPost
                closeModal={closeModal}
                setGroupPosts={setGroupPosts}
                groupPosts={groupPosts}
              />
            </Modal>
          )}
        </div>
        {/* vor map muss  leeres array gibt null  group */}
        {/* Container für die Post-Karten  */}
        <div className="mt-4 px-4 md:px-0">
          {groupPosts.map((post) => (
            <GroupPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default GroupComponent;
