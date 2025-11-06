// import "./OneBookPage.css";
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

export default function BookPage({book}) {

// const { id } = useParams
// const book = books.filter(el => el.id === id)


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
