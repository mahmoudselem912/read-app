import React from "react";
import Book from "./book";

const ShowShelf = ({ shelfBook, shelfName, onUpdateShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBook
            ? shelfBook.map(book => (
                <Book key={book.id} book={book} onUpdateShelf={onUpdateShelf} />
              ))
            : null}
        </ol>
      </div>
    </div>
  );
};

export default ShowShelf;
