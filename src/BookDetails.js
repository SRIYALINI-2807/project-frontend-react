import React from 'react';
import { useParams } from 'react-router-dom';
import './BookDetails.css';
import { genres } from './Storyteller'; // Assuming genres is exported from Storyteller.js

const BookDetails = () => {
  const { title } = useParams();

  // Find the book by title
  let book = null;
  let genre = null;

  Object.keys(genres).forEach(g => {
    const foundBook = genres[g].find(b => b.title === title);
    if (foundBook) {
      book = foundBook;
      genre = g;
    }
  });

  if (!book) {
    return <div className="book-details-error">Book not found</div>;
  }

  return (
    <div className="book-details-container">
      <img className="book-details-image" src={book.imgSrc} alt={book.title} />
      <div className="book-details-content">
        <h2 className="book-details-title">{book.title}</h2>
        <p className="book-details-description">
          {genre === 'Education' && 'Engaging activities and learning experiences that make education fun and effective.'}
          {genre === 'Moral' && 'Inspiring stories that impart valuable life lessons and ethical values.'}
          {genre === 'Fairytale' && 'Enchanting tales filled with magic, adventure, and timeless lessons.'}
          {genre === 'Princess' && 'Delightful stories about royalty, adventures, and magical kingdoms.'}
          {genre === 'Adventure' && 'Exciting journeys and explorations that capture the spirit of adventure.'}
          {genre === 'Cartoon' && 'Fun and entertaining stories featuring colorful characters and humorous plots.'}
        </p>
        <button className="book-details-read-button">Read</button>
      </div>
    </div>
  );
};

export default BookDetails;
