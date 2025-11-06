import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PlusCircle } from "react-bootstrap-icons";

export default function AddNewBookPage({ submitHandler }) {
  return (
    <Form onSubmit={submitHandler} style={{ margin: "20px auto" }}>
      <Form.Control type="text" placeholder="Название" name="name" />
      <br />
      <Form.Control type="text" placeholder="Автор" name="autor" />
      <br />
      <Form.Control type="text" placeholder="Рейтинг" name="raiting" />
      <br />
      <Form.Control type="text" placeholder="Обложка" name="cover" />
      <br />
      <Form.Control type="text" placeholder="Комментарий" name="comment_of_user" />
      <br />
      <Button variant="outline-warning" type="submit">
        <PlusCircle />
      </Button>
    </Form>
  );
}

