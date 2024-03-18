import { Link, useParams } from "react-router-dom";
import { GroupsContext } from "../context/groupsContext.jsx";
// import { UserContext } from "../context/userContext.jsx";
import { useContext, useState } from "react";
import groupPlaceholderImg from "../assets/groupPlaceholder.jpg";
import CreatePost from "../mainComponents/createPost-Components/CreatePost.jsx";
import { Modal } from "../mainComponents/createPost-Components/Modal.jsx";

const GroupComponent = () => {
  const { groupId } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const { groupsData } = useContext(GroupsContext);
  console.log(groupsData);
  // const { userData, setUserData } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const group = groupsData.find((group) => group._id === groupId);
  console.log("membertest GoupCompo", group);
  /******************************************************
   *    img
   ******************************************************/
  // ! Cloudenary Anbindung fehlt noch

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
      <div className="mt-10">
        <div className="flex flex-col mt-8">
          <Link to={`/groups`}>
            <p className="pb-5">Zurück zur Gruppenübersicht</p>
          </Link>
          <div className="border-solid border p-2 flex flex-col">
            <h3 className="border-solid border p-2 mb-2">{group.title}</h3>
            <img
              src={groupPlaceholderImg}
              alt="Gruppenbild"
              className="border-solid border p-2 mb-4"
            />
            <div className="flex flex-col mb-4">
              <div className="flex justify-between mb-2">
                <aside
                  onClick={detailsHandler}
                  className="border-solid border p-2 cursor-pointer flex-grow"
                >
                  {!showDetails ? "Details einblenden" : "Details ausblenden"}
                </aside>
                <aside className="border-solid border p-2">Menü</aside>
              </div>
              {showDetails && (
                <div className="flex flex-col">
                  <article className="border-solid border p-2 mb-2">
                    {group.text}
                  </article>
                  <article className="border-solid border p-2 mb-2">
                    {/* Admins: {modsAdminsVornamen()} */}
                    Admins: {formatNamesList(group.admins)}
                  </article>
                  <article className="border-solid border p-2 mb-2">
                    {/* Mods: {modsAdminsVornamen()} */}
                    Mods: {formatNamesList(group.mods)},
                  </article>
                  <article className="border-solid border p-2 mb-2">
                    {/* Mitglieder - Je nach Datenstruktur ggf. anpassen */}
                    Mitglieder: {formatNamesList(group.members)}
                  </article>
                </div>
              )}
            </div>
            <aside className="border-solid border p-2 flex justify-between">
              <span> {isPrivate()}</span>
              <span>{group.tags}</span>
            </aside>
          </div>
        </div>
        <section onClick={openModal} className="border-solid border p-2 my-4">
          <div className="flex items-center">
            <img
              src="#"
              alt="Profilbild Nutzer"
              className="border-solid border p-2 w-1/5"
            />
            <input
              type="text"
              className="flex-auto ml-2 border-solid border p-2"
              placeholder="Deine Nachricht..."
            />
          </div>
        </section>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <CreatePost closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default GroupComponent;
