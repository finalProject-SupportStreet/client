const Searchbar = ({
  toggleSearchInput,
  searchValue,
  setSearchValue,
  handleSearch,
}) => {
  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <svg
        onClick={toggleSearchInput}
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
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Suche..."
      />
      <button className="m-2 p-2 border" >Send</button>
    </form>
  );
};

export default Searchbar;
