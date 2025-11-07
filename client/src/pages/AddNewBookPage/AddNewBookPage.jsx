import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PlusCircle } from "react-bootstrap-icons";
import BookApi from "../../entities/BookApi";
import { useState } from "react";
// import {useNavigate} from 'react-router'

export default function AddNewBookPage() {
  // const navigate = useNavigate();

  const submitHandler = async function (event) {
    event.preventDefault();
    const respons = await BookApi.createBook(book);
  };

  const [book, setBook] = useState({
    name: "",
    author: "",
    cover: "",
    comment_of_user: "",
  });

  const handleInputChange = (el) => {
    // обрабатываем изменения ввода
    const { name, value } = el.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //     setBook({
  //   // очищаем поля
  //   name: "",
  //   autor: "",
  //   cover: "",
  //   comment_of_user: "",
  // });

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #f8f9fa 50%, #f8f9fa 100%)",
      }}
    >
      <Form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          maxWidth: "500px",
          margin: "20px auto",
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          border: "2px solid #ffffff",
        }}
      >
        <Form.Control
          type="text"
          placeholder="Название"
          name="name"
          value={book.name}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            backgroundColor: "#FFF8E1",
          }}
        />
        <br />
        <Form.Control
          type="text"
          placeholder="Автор"
          name="author"
          value={book.author}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            backgroundColor: "#FFF8E1",
          }}
        />

        <br />
        <Form.Control
          type="text"
          placeholder="Обложка"
          name="cover"
          value={book.cover}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            backgroundColor: "#FFF8E1",
          }}
        />
        <br />
        <Form.Control
          type="text"
          placeholder="Комментарий"
          name="comment_of_user"
          value={book.comment_of_user}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            resize: "vertical",
            backgroundColor: "#FFF8E1",
          }}
        />
        <br />
        <Button
          variant="outline-warning"
          type="submit"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 25px",
            borderRadius: "25px",
            fontWeight: "600",
            borderWidth: "2px",
            backgroundColor: "transparent",
          }}
        >
          <PlusCircle />
        </Button>
      </Form>
    </div>
  );
}