import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewApi from "../../entities/ReviewApi";

export default function Reviews() {
  const { id } = useParams(); // id книги из URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await ReviewApi.getReviewsByBookId(id);
        console.log("Отзывы книги:", data);
        setReviews(data.data || []); // formatResponse -> data.data = массив отзывов
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [id]);

  if (loading) return <p>Загрузка отзывов...</p>;
  if (reviews.length === 0) return <p>Отзывов пока нет</p>;

  return (
    <div>
      <h3>Отзывы:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.text_of_review}</p>
            <small>Автор: пользователь #{review.user_id}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
