import groupPlaceholderImg from "../assets/groupPlaceholder.jpg";

const GroupCard = ({ group }) => {
  const { title, text, image, privateGroup, members } = group;
  // const { adress, groups } = userGroupData;

  //! Muss noch programiert werden
  const isMember = true;

  // Funktion zur Berechnung der Anzahl der Gruppenmitglieder
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

  //! muss an Cloudinary angeschlossen werden
  const groupImage = () => {
    if (!image) {
      return groupPlaceholderImg;
    } else {
      return image;
    }
  };

  // Ausgabe Private oder Öffentliche Gruppe
  const isPrivate = () => {
    if (privateGroup) {
      return "Private Gruppe";
    } else {
      return "Öffentliche Gruppe";
    }
  };

  return (
    <>
      <li key={title} className="border border-black mt-2 p-2">
        <article>
          <header>
            <a href="#">
              <img src={groupImage()} alt="Group Image" className="h-24 w-24" />
            </a>
            <div>
              <h3>{title}</h3>
              <span>{text}</span>
              <span>{isPrivate()}</span>
            </div>
          </header>
          <article>
            <span>
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
            <aside>
              {isMember ? (
                <span>Du bist bereits Mitglied</span>
              ) : (
                <a href="#">Beitreten</a>
              )}
            </aside>
          </article>
        </article>
      </li>
    </>
  );
};

export default GroupCard;
