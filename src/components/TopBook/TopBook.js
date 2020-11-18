import React from 'react';
import { Link } from 'react-router-dom';
import './TopBook.css';

function TopBook( {book} ){

  const isbn = book.volumeInfo.industryIdentifiers[0].identifier || book.volumeInfo.industryIdentifiers[1].identifier;

  return (
    <div className="topbook">
      <Link className="topbook-link" to={`book/${isbn}`}>
        <div className="topbook-image">
          <img className="topbook-image" src={book.volumeInfo.imageLinks.thumbnail} alt="book-cover"/>        
        </div>
        <div className="topbook-info">
          <h5>{book.volumeInfo.title}</h5>
          <h6>{book.volumeInfo.authors[0]}</h6>
          <p>{book.searchInfo.textSnippet}</p>
        </div>
      </Link>  
    </div>
  )
};

export default TopBook;