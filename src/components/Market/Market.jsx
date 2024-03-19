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
            <ul className="border-black flex justify-between w-80"></ul>

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
