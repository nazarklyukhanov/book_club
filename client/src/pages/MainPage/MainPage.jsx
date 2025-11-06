import { useEffect, useState } from "react";
import BookApi from "../../entities/BookApi";
import "./MainPage.css";
import BookPage from "../BookPage/BookPage";
import { useNavigate } from "react-router";

export default function MainPage({ books }) {
  const navigate = useNavigate();

  return (
    <div className="simple-page">
      <h1>Все книги</h1>
      <div className="simple-grid">
        {books.map((el) => (
          <div key={el.id} className="book-card">
            <BookPage book={el} />
            <button
              onClick={() => navigate(`/books/${el.id}`)}
              className="details-button"
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

