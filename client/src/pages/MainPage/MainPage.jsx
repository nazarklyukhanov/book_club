
import { useEffect, useState } from 'react';
import BookApi from '../../entities/BookApi';
import './MainPage.css';
import OneBookPage from '../OneBookPage/OneBookPage';
import { useNavigate } from 'react-router';

export default function MainPage() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  async function fetchBooks() {
    const data = await BookApi.getAllBooks();
    console.log(data);
    setBooks(data.data);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="simple-page">
      <h1>Все книги</h1>
      <div className="simple-grid">
        {books.map((el) => (
          <div key={el.id} className="book-card">
            <OneBookPage book={el} />
            <button 
              onClick={() => navigate(`/books/${el.id}`)}
              className="details-button"
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BookApi from '../entities/BookApi';
// import './MainPage.css';

// export default function MainPage({ user }) {
//   const [books, setBooks] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadBooks();
//   }, []);

//   const loadBooks = async () => {
//     try {
//       const data = await BookApi.getAllBooks();
//       setBooks(data);
//     } catch (err) {
//       console.error('Error loading books:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? books.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === books.length - 1 ? 0 : prev + 1));
//   };

//   const handleBookClick = (bookId) => {
//     if (!user) {
//       navigate('/signin');
//       return;
//     }
//     navigate(`/book/${bookId}`);
//   };

//   if (loading) {
//     return <div className="loading">Загрузка...</div>;
//   }

//   if (books.length === 0) {
//     return (
//       <div className="empty-state">
//         <h2>Пока нет книг</h2>
//         <p>Станьте первым, кто добавит книгу!</p>
//         {user && (
//           <button onClick={() => navigate('/add-book')} className="add-first-book-btn">
//             Добавить книгу
//           </button>
//         )}
//       </div>
//     );
//   }

//   const currentBook = books[currentIndex];

//   return (
//     <div className="main-page">
//       <div className="hero-section">
//         <h1 className="hero-title">Добро пожаловать в BookLover</h1>
//         <p className="hero-subtitle">Делитесь впечатлениями о прочитанных книгах</p>
//       </div>

//       <div className="carousel-container">
//         <button onClick={handlePrev} className="carousel-btn prev">
//           ‹
//         </button>

//         <div className="carousel-track">
//           {books.map((book, index) => {
//             const position = index - currentIndex;
//             let className = 'carousel-item';
            
//             if (position === 0) className += ' active';
//             else if (position === -1 || position === books.length - 1) className += ' prev';
//             else if (position === 1 || position === -books.length + 1) className += ' next';
//             else className += ' hidden';

//             return (
//               <div
//                 key={book.id}
//                 className={className}
//                 onClick={() => handleBookClick(book.id)}
//               >
//                 <div className="book-card">
//                   <div className="book-cover">
//                     {book.coverImage ? (
//                       <img src={`http://localhost:3000${book.coverImage}`} alt={book.title} />
//                     ) : (
//                       <div className="no-cover">📖</div>
//                     )}
//                   </div>
//                   <div className="book-info">
//                     <h3 className="book-title">{book.title}</h3>
//                     <p className="book-author">{book.author}</p>
//                     <div className="book-rating">
//                       {'⭐'.repeat(Math.round(book.averageRating || 0))}
//                       <span className="rating-value">
//                         {(book.averageRating || 0).toFixed(1)}
//                       </span>
//                     </div>
//                     <p className="book-description">{book.description}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <button onClick={handleNext} className="carousel-btn next">
//           ›
//         </button>
//       </div>

//       <div className="carousel-dots">
//         {books.map((_, index) => (
//           <button
//             key={index}
//             className={`dot ${index === currentIndex ? 'active' : ''}`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

