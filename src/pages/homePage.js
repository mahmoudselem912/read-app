import React from "react";
import { withRouter } from "react-router-dom";

import ShowShelf from "../components/showShelf";

const HomePage = ({ history, books, updateShelf }) => {
  //using hooks for state management
  // const [currentlyReading, setCurrentlyReading] = useState([]);
  // const [wantToRead, setWantToRead] = useState([]);
  // const [read, setRead] = useState([]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {books ? (
          <div>
            <ShowShelf
              shelfBook={books.filter(
                book => book.shelf === "currentlyReading"
              )}
              shelfName="Currently Reading"
              onUpdateShelf={updateShelf}
            />
            <ShowShelf
              shelfBook={books.filter(book => book.shelf === "wantToRead")}
              shelfName="Want To Read"
              onUpdateShelf={updateShelf}
            />
            <ShowShelf
              shelfBook={books.filter(book => book.shelf === "read")}
              shelfName="Read"
              onUpdateShelf={updateShelf}
            />
          </div>
        ) : null}
      </div>
      <div className="open-search">
        <button onClick={() => history.push("/search")}>Add a book</button>
      </div>
    </div>
  );
};

export default withRouter(HomePage);
