import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import { search } from "../BooksAPI";
import debounce from "lodash.debounce";
import Book from "../components/book";

const SearchPage = ({ history, updateShelf }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState();

  const debounceSave = useCallback(
    debounce(newValue => {
      if (newValue.length > 0) {
        search(newValue)
          .then(function(result) {
            if (result.error) {
              setSearchResult([]);
            } else {
              setSearchResult(
                result.filter(book => {
                  return book.imageLinks;
                })
              );
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        setSearchResult([]);
      }
    }, 200),
    []
  );

  function handleChange(value) {
    setSearchText(value);
    debounceSave(value);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchText}
            onChange={e => handleChange(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult
            ? searchResult.map(book => (
                <Book key={book.id} book={book} onUpdateShelf={updateShelf} />
              ))
            : null}
        </ol>
      </div>
    </div>
  );
};

export default withRouter(SearchPage);
