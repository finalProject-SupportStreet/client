

const MarketCard = ( {item} ) => {


  const showPriceSpaces = (num) => {
    let strNumber = num.toString();
    return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };


  return (
    <div
      className="w-1/2 m-1 p-2 flex flex-col justify-center align-center border-2 border-indigo-200 hover:border-indigo-500  hover:bg-sky-100 transition ease-in-out delay-50 "
    >
      <p className="m-2 text-xl underline">Angebot: {item.title}</p>
      <p className="m-2">Beschreibung: {item.description}</p>

      <img className="w-full" src={`${item.image}`} alt="pic not found" />

      {/* wenn es keinen Preis gibt -> 'gratis' rendern */}
      {item.price ? (
        <p className="m-2 text-xl text-red-500">{showPriceSpaces(item.price)} €
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
  );
};

export default MarketCard;
