import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router";
import * as Icon from "react-bootstrap-icons";
import Row from "react-bootstrap/esm/Row";
import BookApi from '../../entities/BookApi';

export default function MyBooksPage( {user} ) {
  const [book, setBook] = useState([])
  
  
async function getMyBooks(id) {
  const myBooks = await BookApi.getMyBooks(id)
  setBook(myBooks)
}

useEffect( () => {getMyBooks(user.id)} , [] )

  return (
    <>
    <Row> {book.map((el) => (<Col xs={4}>
      <Card>
        <Card.Body>
          <Card.Title style={{ color: '#123456', textAlign: 'center', fontFamily: 'cursive',fontSize: "25px" }}>
            {el.title}{" "}
            <Link
              to={`/books/${el.id}`}
              style={{ float: "right", color: "black" }}
            >
              <Icon.ArrowRight />
            </Link>
          </Card.Title>
          <Card.Img src="/public/3.jpg" />
        </Card.Body>
      </Card>
      <br />
    </Col>))}</Row>
    </>
  )
}