import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { getAll, update } from "./BooksAPI";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/searchPage";

const BooksApp = () => {
  const [books, setBooks] = useState();
  function updateShelf(book, shelf) {
    update(book, shelf)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });

    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      return b;
    });

    setBooks(updatedBooks);
  }

  useEffect(() => {
    //catch all books and sorting them to the three categories
    getAll()
      .then(function(result) {
        console.log(result);

        // eslint-disable-next-line array-callback-return
        // result.map(book => {
        //   if (book.shelf === "currentlyReading") {
        //     setCurrentlyReading(oldBooks => [...oldBooks, book]);
        //   } else if (book.shelf === "wantToRead") {
        //     setWantToRead(oldBooks => [...oldBooks, book]);
        //   } else if (book.shelf === "read") {
        //     setRead(oldBooks => [...oldBooks, book]);
        //   }
        // });

        setBooks(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            render={() => <HomePage books={books} updateShelf={updateShelf} />}
          />
          <Route
            path="/search"
            render={() => <SearchPage updateShelf={updateShelf} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

// class BooksApp extends React.Component {
//   state = {
//     /**
//      * TODO: Instead of using this state variable to keep track of which page
//      * we're on, use the URL in the browser's address bar. This will ensure that
//      * users can use the browser's back and forward buttons to navigate between
//      * pages, as well as provide a good URL they can bookmark and share.
//      */
//     showSearchPage: false
//   }

//   render() {
//     return (

//     )
//   }
// }

export default BooksApp;
