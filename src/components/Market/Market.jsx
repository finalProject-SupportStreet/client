import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";
import { Link } from "react-router-dom";

const Market = () => {
  const { userData } = useContext(UserContext);

  console.log("FЯ!ΞdℇM4ภภ");

  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    const getMarketItems = async () => {
      console.log("--------------USERDATA ADDRESS ZIP--------------------");
      console.log(userData.address[0].zip);
      console.log("-----------------------------------------");

      const response = await fetch(
        `http://localhost:5500/getMarketItemByZip/${userData.address[0].zip}`,
        {
          credentials: "include",
        }
      );
      console.log("-----------------------------------------");
      console.log("response -> ", response);

      const data = await response.json();

      console.log("---------------DATA--------------------");
      console.log(data);
      setMarketItems(data);
    };
    getMarketItems();
  }, []);

  useEffect(() => {
    console.log("marketItems in Market.jsx:", marketItems);
  }, [marketItems]);

  const showPriceSpaces = (num) => {
    let strNumber = num.toString();

    return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // if(marketItems.length !== 0) {
  return (
    <div className="mt-12">
      <div className="min-w-420px">
        <div className="groupBar bg-stone-400 mt-2 border border-black">
          <header className="p-5">
            <h2 className="text-3xl">Marktplatz</h2>
          </header>
          <div className="groupHeaderBar flex justify-between items-center border border-black p-2">
            <ul className="border-black flex justify-between w-80">
              {/* {searchInputVisible ? (
                  <Searchbar
                    toggleSearchInput={toggleSearchInput}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                  /> */}
              {/* ) : (
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
                      <select
                        id="tags"
                        name="tags"
                        className="mt-1 block text-gray-800 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="" disabled>
                          Wähle eine Kategorie aus...
                        </option>
                        <option value="Kennlern/Stammtisch">
                          Kennlern/Stammtisch
                        </option>
                        <option value="Bildung/Erfahrung">
                          Bildung/Erfahrung
                        </option>
                        <option value="Kunst, Kultur & Musik">
                          Kunst, Kultur & Musik
                        </option>
                        <option value="Märkte & Flohmärkte">
                          Märkte & Flohmärkte
                        </option>
                        <option value="Computer, Internet & Technik">
                          Computer, Internet & Technik
                        </option>
                        <option value="Familien & Kinder">
                          Familien & Kinder
                        </option>
                        <option value="Essen & Trinken">Essen & Trinken</option>
                        <option value="Feste & Feiern">Feste & Feiern</option>
                        <option value="Lokales Engagement">
                          Lokales Engagement
                        </option>
                        <option value="Gestalten & Heimwerken">
                          Gestalten & Heimwerken
                        </option>
                        <option value="Gesundheit / Wellness">
                          Gesundheit / Wellness
                        </option>
                        <option value="Sport & Bewegung">
                          Sport & Bewegung
                        </option>
                        <option value="Umwelt & Nachhaltigkeit">
                          Umwelt & Nachhaltigkeit
                        </option>
                        <option value="Teilen, Tauschen, Reparieren">
                          Teilen, Tauschen, Reparieren
                        </option>
                        <option value="Viertel verschönern">
                          Viertel verschönern
                        </option>
                        <option value="Ausflüge">Ausflüge</option>
                        <option value="Sonstiges">Sonstiges</option>
                      </select>
                    )}
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
                  </>
                )} */}
            </ul>

            <aside className="pr-3">
              <Link to="/marketform">
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
              </Link>
            </aside>
          </div>
        </div>

        {/* VORLAGE: MUSS ANGEPASST WERDEN! */}
        {/* {searchResults[0] ? (
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
          ) : (
            <>
              <span>Deine Angebote</span>
              <ul className="h-auto">
                {userData.groups &&
                  userData.groups.map((group, index) => (
                    <GroupCard key={index} group={group} />
                  ))}
              </ul>

              <span>Andere Angebote</span>
              <ul className="h-auto">
                {groupsData &&
                  groupsData.map((group, index) => (
                    <GroupCard key={index} group={group} />
                  ))}
              </ul>
            </>
          )} */}
      </div>
      <div className="flex flex-col">
        <div className="mt-14 text-blue-500 underline underline-offset-2">
          WILLKOMMEN AUF DEM MARKTPLATZ
        </div>

        {marketItems.map((item, i) => (
          <div
            key={i}
            className="w-1/2 m-1 p-2 flex flex-col justify-center align-center border-2 border-indigo-200 hover:border-indigo-500  hover:bg-sky-100 transition ease-in-out delay-50 "
          >
            <p className="m-2 text-xl underline">Angebot: {item.title}</p>
            <p className="m-2">Beschreibung: {item.description}</p>

            <img className="w-full" src={`${item.image}`} alt="pic not found" />

            {/* wenn es keinen Preis gibt -> 'gratis' rendern */}
            {item.price ? (
              <p className="m-2 text-xl text-red-500">
                {showPriceSpaces(item.price)}€
              </p>
            ) : (
              <p className="m-2 text-xl text-green-600">Gratis</p>
            )}
            <div className="m-2">
              Kategorie:
              <span className="p-1.5 border-2 border-sky-600 rounded-full bg-sky-200 ">
                {item.offerType}
              </span>
            </div>
            <p className="m-2">Id des Erstellers: {item.creator}</p>
          </div>
        ))}
      </div>
    </div>
  );
  // }
};
export default Market;
