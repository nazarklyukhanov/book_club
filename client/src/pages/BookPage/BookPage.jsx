
import React from 'react';
import { useNavigate } from 'react-router';
import styles from "./BookPage.module.css";

export default function BookPage({ book }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/books/${id}`);
  }

  return (
    <div className={styles.container}> 
      <p className={styles.bookName}>{book.name}</p>
      <p className={styles.author}>{book.autor}</p>
      <button 
        className={styles.moreButton} 
        onClick={() => handleClick(book.id)}
      >
        Подробнее
      </button>
      <img 
        className={styles.bookImage} 
        src={`./public/${book.name}.jpg`} 
        alt={book.name} 
      />
      <p className={styles.comment}>{book.comment_of_user}</p>
      <p className={styles.userId}>{book.user_id}</p>
    </div>
  );
}