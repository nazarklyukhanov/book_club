
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BookApi from '../../entities/BookApi';


export default function OneBookPage() {
const [book, setBook] = useState({})
const { id } = useParams

 

  useEffect(() => {
async function fetchOneBook() {
    const data = await BookApi.getOneBook(id);
    console.log("+++++++++++++++",data);
    setBook(data.data);
  }
    fetchOneBook();
    console.log("-------------------",book);
    
  }, []);


  return (
   <div> 
<p>{book.name}</p>
<p>{book.autor}</p>
<p>{book.cover}</p>
<p>{book.comment_of_user}</p>
<p>{book.user_id}</p>
</div>

  )
}
