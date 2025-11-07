import { useEffect, useState } from "react";
import RaitingApi from "../../entities/RaitingApi";
import styles from "./Raiting.module.css";

export default function Raiting({ book }) {
  const [raiting, setRaiting] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);

  async function getRaiting() {
    const bookRaiting = await RaitingApi.getBookRaiting(book.id);
    setRaiting(bookRaiting);
  }

  useEffect(() => {
    getRaiting();
  }, []);

  async function updateRaiting() {
    const updateR = await RaitingApi.updateRaiting(book.id, selectedStars);
    setRaiting(updateR);
  }

  function handleStarClick(starIndex) {
    setSelectedStars(starIndex);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Оцени книгу</h1>
      <div className={styles.stars}>
        {[...Array(10)].map((_, i) => {
          const starNumber = i + 1;
          return (
            <span
              key={starNumber}
              className={`${styles.star} ${starNumber <= selectedStars ? styles.starActive : ""}`}
              onClick={() => handleStarClick(starNumber)}
            >
              ★
            </span>
          );
        })}
      </div>
      <button className={styles.button} onClick={updateRaiting}>
        Добавить рейтинг
      </button>
      <p className={styles.currentRaiting}>Текущий рейтинг: {raiting}</p>
    </div>
  );
}