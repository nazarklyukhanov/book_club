import { useEffect, useState } from "react";
import BookApi from "../../entities/BookApi";
import styles from "./MainPage.module.css";
import BookPage from "../BookPage/BookPage";
import { useNavigate } from "react-router";

export default function MainPage() {
  const [book, setBook] = useState([]);

  async function getBooks() {
    const books = await BookApi.getAllBooks();
    setBook(books.data);
  }

  useEffect(() => {
    getBooks();
  }, []);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выбери книгу по душе!</h1>
      <div className={styles.grid}>
        {book.map((el) => (
          <div key={el.id} className={styles.bookCard}>
            <BookPage book={el} />
          </div>
        ))}
      </div>
    </div>
  );
}
