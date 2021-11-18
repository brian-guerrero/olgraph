import React from "react";
import DataPresentation from "./DataPresentation";
import PrimarySearchAppBar from "../material/PrimarySearchAppBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
const { useState, useCallback } = require("react");

function SearchBooks() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsPage, setSearchResultsPage] = useState(1);

  const searchBooks = useCallback(
    (isLoadingMore) => {
      if (isLoadingMore) {
        setSearchResultsPage(searchResultsPage + 1);
      } else {
        setSearchResultsPage(1);
      }
      fetch(
        `http://openlibrary.org/search.json?q=${searchPhrase.replace(
          /\s/g,
          "+"
        )}&page=${searchResultsPage}`
      )
        .then((res) => res.json())
        .then((results) => {
          if (isLoadingMore) {
            setSearchResults(searchResults.concat(results.docs));
          } else {
            setSearchResults(results.docs);
          }
          setIsSearching(false);
        })
        .catch((error) => {
          setIsSearching(false);
          console.log(error);
        });
    },
    [searchResultsPage, searchPhrase, searchResults]
  );

  return (
    <div>
      <PrimarySearchAppBar
        SearchBarHandler={(e) => setSearchPhrase(e.target.value)}
        SearchButtonHandler={(e) => {
          e.preventDefault();
          searchBooks(false);
        }}
        LoadMoreButtonHandler={(e) => {
          e.preventDefault();
          searchBooks(true);
        }}
        SearchBarValue={searchPhrase}
      />
      <Container sx={{ marginTop: "2rem" }}>
        <Paper>
          {isSearching ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            ""
          )}
          <div>
            {searchResults.length > 0 ? (
              <DataPresentation
                Data={searchResults}
                GraphHeight={400}
                GraphWidth={1000}
              />
            ) : (
              ""
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default SearchBooks;
