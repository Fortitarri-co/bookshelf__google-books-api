import React, { useEffect, useState } from 'react';
import SavedBook from './SavedBook';
import NoBooks from './NoBooks';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

function SavedPage(){
    console.log("SavedPage loading")
    const [booksList, setBooksList] = useState([]);
    
    async function getSavedBooks(){
        console.log("[getSavedBooks] ----");
        try {
            const result = await axios.get('/api/savedbooks');
            console.log(result);
            const savedBooks = result.data.savedBooks;
            setBooksList([...savedBooks]);
        } catch (err) {
            console.log("ERROR", err);
        };
    };

    useEffect( () => {
        getSavedBooks();
    }, [])

    return (
        <>            
            { booksList.length > 0 ? 
                booksList.map( book => 
                    <SavedBook 
                        key={uuidv4()}
                        bookID={book.bookID} 
                        title={book.title}
                        authors={book.authors}
                        textsnippet={book.textsnippet}
                        description={book.description}
                        infoLink={book.infoLink}   
                        image={book.image}
                        isbn={book.isbn}
                    />)
                : 
                    <NoBooks />
            }
        </>
    ); 
};

export default SavedPage;