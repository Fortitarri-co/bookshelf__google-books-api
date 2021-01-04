import React, { useEffect, useState } from 'react';
import './SavedPage.css';
import SavedBook from '../SavedBook/SavedBook';
import NoBooks from '../NoBooks/NoBooks';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SavedPage (props){
  const [booksList, setBooksList] = useState([]);
  const [booksDisplay, setBooksDisplay] = useState(0);
  const [loading, setLoading] = useState(true);
  
  function getUserID(){
    const localID = JSON.parse( localStorage.getItem("userID") );
    return localID 
  };

  async function getSavedBooks(){
    try {
      const userID = await getUserID();
      const result = await axios.get(`/api/savedbooks/${userID}`);
      const savedBooks = result.data.savedBooks;
      setBooksList([...savedBooks]);
      const bookCount = savedBooks.length;
      setBooksDisplay( bookCount );
      setLoading(false);
    } catch (err) {
      console.log("ERROR", err);
    };
  };

  useEffect( () => {
    getSavedBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksDisplay])

  if (loading) {
    return (
      <></>
    );
  };

  return (
    <div className="savedpage">
      { booksDisplay > 0 ? 
        <div>
          <h1>Saved Books</h1>
          <div className="flex-container">
            { booksList.map( book => 
              <SavedBook 
                key={uuidv4()}
                dbID={book._id}
                bookID={book.bookID} 
                title={book.title}
                authors={book.authors}
                textSnippet={book.textSnippet}
                description={book.description}
                infoLink={book.infoLink}   
                image={book.image}
                isbn={book.isbn}
                setBooksDisplay={setBooksDisplay}
              />)
            }
          </div>
        </div>
        : 
        <NoBooks />
      }
    </div>
  ); 
};
const memoSavedPage = React.memo( SavedPage );
export default memoSavedPage;
//export default SavedPage;