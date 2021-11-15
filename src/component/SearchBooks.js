const { useState, useCallback } = require("react");

function SearchBooks() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchBooks = useCallback(() => {
    if (isSearching) return;
    setIsSearching(true);
    fetch(
      `http://openlibrary.org/search.json?q=${searchPhrase.replace(/\s/g, "+")}`
    )
      .then((res) => res.json())
      .then((results) => {
        setSearchResults([...results.docs]);
        console.log(results);
        setIsSearching(false);
      })
      .catch((error) => {
        setIsSearching(false);
        console.log(error);
      });
  }, [isSearching, searchPhrase]);

  return (
    <div>
      <input
        type="search"
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          searchBooks();
        }}
      >
        Search
      </button>
      {isSearching ? <p>Searching...</p> : ""}
      <div>
        {searchResults.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </div>
    </div>
  );
}

export default SearchBooks;
