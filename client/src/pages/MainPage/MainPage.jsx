import { useEffect, useState } from "react";
import BookApi from "../../entities/BookApi";
import styles from "./MainPage.module.css";
import BookPage from "../BookPage/BookPage";
import { useNavigate } from "react-router";


export default function MainPage({ books }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/books/${id}`);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выбери книгу по душе!</h1>
      <div className={styles.grid}>
        {books.map((el) => (
          <div key={el.id} className={styles.bookCard}>
            <BookPage book={el} />
          </div>
        ))}
      </div>
    </div>
  );
}