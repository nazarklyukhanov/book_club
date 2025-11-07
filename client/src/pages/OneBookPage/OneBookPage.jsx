
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BookApi from '../../entities/BookApi';
import Raiting from '../../components/Raiting/Raiting';
import styles from "./OneBookPage.module.css";


export default function OneBookPage() {

const [book, setBook] = useState({})

const { id } = useParams()

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
        <img 
          className={styles.bookImage} 
          src={`/public/${book.name}.jpg`} 
          alt={book.name} 
        />
        <Raiting/>
      </div>
  )
}
