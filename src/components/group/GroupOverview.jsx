import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import GroupCard from "./GroupCard.jsx";
import { GroupsContext } from "../context/groupsContext.jsx";
import Searchbar from "./Searchbar.jsx";
import SearchBtnUnclick from "./SearchBtnUnclick.jsx";
import GroupFilter from "./GroupFilter.jsx";

const GroupOverview = () => {
  const { userData } = useContext(UserContext);
  const { groupsData, setGroupsData } = useContext(GroupsContext);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropDFilterIsOpen, setDropDFilterIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  console.log("Userdata Groups in overwiev:", userData.groups);

  /******************************************************
   *    Groupsfetch und daten in den Context laden
   ******************************************************/
  //^ am ende mal schauen ob der GruppenContext notwendig ist

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

  /******************************************************
   *    SuchFunktion
   ******************************************************/

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  // Funktion zum Umschalten der Sichtbarkeit des Suchfelds
  const toggleSearchInput = () => {
    setSearchInputVisible(!searchInputVisible);
  };

  // Funktion zum Ausführen der Suche
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5500/getSearchGroups/${searchValue}`,
        {
          credentials: "include",
        }
      );

      const responseData = await response.json(); // in JSON umgewandeln

      //! Error Message durch Userverständliche MSG ersetzten
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSearchResults(responseData); // Suchergebnisse basierend auf den JSON-Daten setzten

      console.log("SEARCH-FETCH (searchResults) ERGEBNIS: ", searchResults);
    } catch (error) {
      console.error("Error searching groups:", error);
    }
    // Sichtbarkeit des Suchfelds zurück setzen
    setSearchInputVisible(false);
    setSearchValue("");
  };

  /******************************************************
   *    FilterFunktion
   ******************************************************/
  const toggleDropdown = () => {
    setDropDFilterIsOpen(!dropDFilterIsOpen);
  };

  // Handler-Funktion für die Auswahl im Dropdown-Menü
  const handleFilterChange = (event) => {
    console.log("Filter Log", event.target.value);
    setSelectedTag(event.target.value);
  };

  useEffect(() => {
    console.log("Aktualisierter selectedTag: ", selectedTag);
  }, [selectedTag]);

  // Filtere gruppenliste nach Tag
  let filteredGroups = groupsData;
  if (selectedTag) {
    filteredGroups = groupsData.filter((group) => group.tags === selectedTag);
    console.log(filteredGroups);
  }

  return (
    <>
      <div className="mt-12">
      <div className="min-w-420px">
        <div className="groupBar bg-stone-400 mt-2 border border-black">
          <header className="p-5">
            <h2 className="text-3xl">Gruppen</h2>
          </header>
          <div className="groupHeaderBar flex justify-between items-center border border-black p-2">
            <ul className="border-black flex justify-between w-80">
              {searchInputVisible ? (
                  <Searchbar
                    toggleSearchInput={toggleSearchInput}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                  />
              ) : (
                  <SearchBtnUnclick toggleSearchInput={toggleSearchInput} />
                )}
                {!searchInputVisible && (
                  <>
                    <li className="flex items-center" onClick={toggleDropdown}>
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
                    {dropDFilterIsOpen && (
                      <GroupFilter
                        selectedTag={selectedTag}
                        onChange={handleFilterChange}
                      />
                    )}
                  </>
                )}

                {!dropDFilterIsOpen && (
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
                )}
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
        {/* //*____________________________________ */}


          {/* RENDERING DER CARDS */}
          {searchResults.length > 0 ? (
            // Suchergebnisse vorhanden

            <>
              <span>gefundene Suchergebnisse</span>
              <button
                className="border border-solid ml-5"
                onClick={() => setSearchResults([])}
              >
                Zurück
              </button>
              <ul className="h-auto">
                {searchResults.map((group, index) => (
                  <GroupCard key={index} group={group} />
                ))}
              </ul>
            </>
          ) : selectedTag ? (
            // Filter ist aktiv, zeige gefilterte Gruppen
            <>
              {/* Gefilterte Gruppen basierend auf selectedTag anzeigen */}
              <ul className="h-auto">
                {groupsData
                  .filter((group) => group.tags.includes(selectedTag))
                  .map((group, index) => (
                    <GroupCard key={index} group={group} />
                  ))}
              </ul>
            </>
          ) : (
            // Standardansicht ohne Filter und Suche
            <>
              <span>Deine Gruppen</span>
              <ul className="h-auto">
                {userData.groups &&
                  userData.groups.map((group, index) => (
                    <GroupCard key={index} group={group} />
                  ))}
              </ul>

              <span>Andere Gruppen</span>
              <ul className="h-auto">
                {groupsData &&
                  groupsData
                    .filter(
                      (groupData) =>
                        !userData.groups.some(
                          (userGroup) => userGroup._id === groupData._id
                        )
                    )
                    .map((group) => (
                      <GroupCard key={group._id} group={group} />
                    ))}
              </ul>
            </>
          )}
      </div>

    </div>
    </>
  );
};

export default GroupOverview;
