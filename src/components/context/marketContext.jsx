import { createContext, useEffect, useState } from "react";

export const MarketContext = createContext();


export const MarketProvider = ({ children }) => {
  // Beim Laden aus dem localStorage die Daten parsen
  const savedMarketItems = JSON.parse(localStorage.getItem("marketData"));

  const [marketData, setMarketData] = useState(savedMarketItems || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("marketData:", marketData);

  useEffect(() => {
    if (marketData !== null) {
      localStorage.setItem("marketData", JSON.stringify(marketData));
    }
  }, [marketData]);


  return (
    <MarketContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, marketData, setMarketData}}
    >
      {children}
    </MarketContext.Provider>
  );
};