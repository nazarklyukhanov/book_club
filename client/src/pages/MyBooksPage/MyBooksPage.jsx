import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router";
import * as Icon from "react-bootstrap-icons";
import Row from "react-bootstrap/esm/Row";

export default function MyBooksPage( {user} ) {
  const [book, setBook] = useState([])
// console.log(user.data.id);

async function getMyBooks() {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/books/mybooks/${user?.data?.id}`);
      const data = await response.json();
      
      if (response.status === 200) setBook(data);
    } catch (error) {
      console.log(error);
    }
  }

useEffect( () => {getMyBooks()} , [] )

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