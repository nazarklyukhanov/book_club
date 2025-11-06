import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PlusCircle } from "react-bootstrap-icons";
import BookApi from "../../entities/BookApi";
import { useState } from "react";



export default function AddNewBookPage({ submitHandler }) {

  



  return (
    <div
      style={{
        backgroundColor: "#8B4513", 
        minHeight: "100vh",
        padding: "20px",
        background:
          "linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)",
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

          backgroundColor: "#F5E6D3", 
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(139, 69, 19, 0.3)",
          border: "2px solid #A0522D",
        }}
      >
        <Form.Control
          type="text"
          placeholder="Название"
          name="name"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            backgroundColor: "#FFF8E1",
            color: "#5D4037",
          }}
        />
        <br />
        <Form.Control
          type="text"
          placeholder="Автор"
          name="autor"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            backgroundColor: "#FFF8E1",
            color: "#5D4037",
          }}
        />

        <br />
        <Form.Control
          type="text"
          placeholder="Обложка"
          name="cover"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            backgroundColor: "#FFF8E1",
            color: "#5D4037",
          }}
        />
        <br />
        <Form.Control
          type="text"
          placeholder="Комментарий"
          name="comment_of_user"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "2px solid #e9ecef",
            resize: "vertical",
            backgroundColor: "#FFF8E1",
            color: "#5D4037",
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
            color: "#8B4513",
            backgroundColor: "transparent",
          }}
        >
          <PlusCircle />
        </Button>
      </Form>
    </div>
  );
}
