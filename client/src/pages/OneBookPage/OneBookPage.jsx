import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookApi from "../../entities/BookApi";
import Raiting from "../../components/Raiting/Raiting";
import styles from "./OneBookPage.module.css";
import Reviews from "../Reviews";

export default function OneBookPage() {
  const [book, setBook] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function fetchOneBook() {
      const data = await BookApi.getOneBook(id);
      setBook(data.data);
    }
    fetchOneBook();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.bookName}>{book.name}</p>
      <p className={styles.author}>{book.autor}</p>
      <img
        className={styles.bookImage}
        src={`/public/${book.name}.jpg`}
        alt={book.name}
      />
      <p className={styles.comment}>{book.comment_of_user}</p>
      <p className={styles.userId}>{book.user_id}</p>
      <Raiting />
      <Reviews />
    </div>
  );
}