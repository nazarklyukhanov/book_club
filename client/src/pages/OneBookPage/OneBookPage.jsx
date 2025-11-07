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
    <div>
      <p>{book.name}</p>
      <p>{book.autor}</p>
      <p>{book.cover}</p>
      <p>{book.comment_of_user}</p>
      <p>{book.user_id}</p>

      <Raiting />
      <Reviews />
    </div>
   
  );
}
