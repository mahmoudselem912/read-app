import React, { useState } from "react";
import { getAll } from "../BooksAPI";

const Book = ({ book, onUpdateShelf }) => {
  const [state, setState] = useState(
    book.shelf === undefined ? "none" : book.shelf
  );

  if (book.shelf === undefined) {
    getAll()
      .then(function(result) {
        // eslint-disable-next-line array-callback-return
        result.map(APIbook => {
          if (APIbook.id === book.id) {
            setState(APIbook.shelf);
          }
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function handleChange(e) {
    setState(e.target.value);
    onUpdateShelf(book, e.target.value);
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select value={state} onChange={handleChange}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    </li>
  );
};

export default Book;
