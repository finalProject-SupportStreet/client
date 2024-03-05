import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext.jsx";
import GroupCard from "./GroupCard.jsx";
import { GroupsContext } from "../context/groupsContext.jsx";

const GroupOverview = () => {
  const { userData } = useContext(UserContext);
  const { groupsData, setGroupsData } = useContext(GroupsContext);
  console.log("userData in Overview", userData);

  // Groupsfetch und daten in den Context laden
  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const response = await fetch("http://localhost:5500/getAllGroups");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGroupsData(data);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupsData();
  }, []);

  console.log("groups Fetch in overview", groupsData);

  return (
    <>
      <div className="m-5 ">
        <div className="min-w-420px">
          <div className="groupBar bg-stone-400 mt-2 border border-black">
            <header className="p-5 ">
              <h2 className="text-3xl">Gruppen</h2>
            </header>
            <div className="groupHeaderBar flex justify-between items-center border border-black p-2">
              <ul className="border-black flex justify-between w-80">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Suchen
                </li>
                <li className="flex items-center">
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
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                    />
                  </svg>
                  Filter
                </li>
                <li className="flex items-center">
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
                      d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                    />
                  </svg>
                  Sortieren
                </li>
              </ul>
              <aside className="pr-3">
                <a href="http://localhost:5173/groupsForm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </aside>
            </div>
          </div>

          {/* VORLAGE: MUSS ANGEPASST WERDEN! */}
          <span>Deine Gruppen</span>
          <ul className="h-full">
            {groupsData &&
              groupsData.map((group) => (
                <GroupCard key={group.title} group={group} />
              ))}
          </ul>

          <span>Andere Gruppen</span>
          <ul className="h-auto">
            {groupsData &&
              groupsData.map((group) => (
                <GroupCard key={group.title} group={group} />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default GroupOverview;
