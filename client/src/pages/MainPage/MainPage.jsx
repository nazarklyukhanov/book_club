// import "./MainPage.css";

// import { useEffect, useState } from "react"

// export default function MainPage() {

//   const [bookArr, setBook] = useState([])

//   useEffect(() => (

//     async function fetchData() {
//       try {
//         const result = await fetch('../')
//       }
//     }
//   ))
    


//   return(

// <h1>Здесь мапим карточки книг</h1>

//   )

// };



// // import './MainPage.css';

// // export default function MainPage() {
// //   return (
// //     <div className="app-container">
// //       <h1>Это главная страница</h1>
// //       <img src="/owl-1.jpg" alt="Сова" />
// //     </div>
// //   );
// // }



// Полностью адаптировано под модель Book:
//{ id, name, autor, cover, comment_of_user}

// import { useEffect, useMemo, useState } from 'react';
// import { Link, useNavigate } from 'react-router'; // оставляю как у тебя
// import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
// import './MainPage.css';

// export default function MainPage({ user }) {
//   // Если есть VITE_API_URL — используем его, иначе относительный /api
//   const API = import.meta.env?.VITE_API_URL || '';
//   const BOOKS_URL = `${API ? API : ''}/api/books/public`;

//   const navigate = useNavigate();
//   const [books, setBooks] = useState([]);
//   const [state, setState] = useState({ loading: true, error: '' });

//   // ===== FALLBACK: демо-данные с ТВОИМИ полями =====
//   const FALLBACK_DEMO = useMemo(
//     () => [
//       {
//         id: '1',
//         name: 'Война и мир',
//         autor: 'Лев Толстой',
//         cover:
//           'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1320&auto=format&fit=crop',
//         comment_of_user:
//           'Книга, которую хочется перечитывать в разные периоды жизни.',
//       },
//       {
//         id: '2',
//         name: 'Преступление и наказание',
//         autor: 'Фёдор Достоевский',
//         cover:
//           'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1320&auto=format&fit=crop',
//         comment_of_user:
//           'Глубокая философская история, которая надолго остаётся в голове.',
//       },
//       {
//         id: '3',
//         name: 'Мастер и Маргарита',
//         autor: 'Михаил Булгаков',
//         cover:
//           'https://images.unsplash.com/photo-1526318472351-bc6fa96eeb52?q=80&w=1320&auto=format&fit=crop',
//         comment_of_user:
//           'Мистика, любовь и вечные вопросы о добре и зле — must read.',
//       },
//     ],
//     []
//   );

//   // ===== Загрузка книг =====
//   useEffect(() => {
//     const controller = new AbortController();

//     (async () => {
//       try {
//         const res = await fetch(BOOKS_URL, {
//           signal: controller.signal,
//           credentials: 'include',
//           headers: { 'Content-Type': 'application/json' },
//         });

//         if (!res.ok) throw new Error(`HTTP ${res.status}`);

//         const data = await res.json();

//         // Принимаем либо массив, либо объект {books: []}
//         const list = Array.isArray(data) ? data : (data?.books ?? []);

//         // Маппим в ЕДИНЫЙ формат под рендер
//         const normalized = list.map((b) => ({
//           id: String(b.id ?? b._id ?? crypto.randomUUID()),
//           name: b.name ?? 'Без названия',
//           autor: b.autor ?? 'Автор неизвестен',
//           cover:
//             b.cover ??
//             'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1320&auto=format&fit=crop',
//           comment_of_user: b.comment_of_user ?? '',
//         }));

//         setBooks(normalized.length ? normalized : FALLBACK_DEMO);
//         setState({ loading: false, error: '' });
//       } catch (e) {
//         console.warn('[MainPage] fallback because:', e?.message || e);
//         setBooks(FALLBACK_DEMO);
//         setState({ loading: false, error: '' });
//       }
//     })();

//     return () => controller.abort();
//   }, [BOOKS_URL, FALLBACK_DEMO]);

//   const goToBook = (bookId, anchor = '') => navigate(`/books/${bookId}${anchor}`);
//   const requireAuth = (nextUrl) =>
//     user ? navigate(nextUrl) : navigate(`/auth?next=${encodeURIComponent(nextUrl)}`);

//   if (state.loading) {
//     return (
//       <div className="main-page">
//         <section className="hero">
//           <Container><h1 className="hero-title">Загрузка…</h1></Container>
//         </section>
//       </div>
//     );
//   }

//   return (
//     <div className="main-page">
//       {/* HERO */}
//       <section className="hero">
//         <Container>
//           <h1 className="hero-title">Добро пожаловать в <span>BookClub</span></h1>
//           <p className="hero-sub">Читайте мнения, ищите фаворитов, делитесь отзывами.</p>
//         </Container>
//       </section>

//      {/* КАРУСЕЛЬ */}
// <section className="carousel-section">
//   <Container>
//     <Carousel interval={5000} pause="hover" className="bc-carousel">
//       {books.map((b) => (
//         <Carousel.Item key={b.id}>
//           <div
//             className="slide-bg"
//             style={{ backgroundImage: `url("${b.cover}")` }}
//             role="img"
//             aria-label={`Обложка: ${b.name}`}
//           />
//           <div className="slide-overlay">
//             <div className="slide-card glass">
//               <div className="author-chip">Автор: {b.autor}</div>
//               <h3 className="book-title" onClick={() => goToBook(b.id)}>
//                 {b.name}
//               </h3>

//               {b.comment_of_user && (
//                 <p className="book-highlight">“{b.comment_of_user}”</p>
//               )}

//               <div className="btn-row">
//                 <Button
//                   as={Link}
//                   to={`/books/${b.id}`}
//                   variant="light"
//                   className="btn-ghost"
//                 >
//                   Смотреть книгу
//                 </Button>
//                 <Button
//                   onClick={() => requireAuth(`/books/${b.id}#rate`)}
//                   className="btn-primary-neon"
//                 >
//                   Оценить / Комментировать
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   </Container>
// </section>


//       {/* СЕТКА КАРТОЧЕК */}
//       <section className="grid-section">
//         <Container>
//           <Row xs={1} sm={2} md={3} lg={4} className="g-4">
//             {books.map((b) => (
//               <Col key={`grid-${b.id}`}>
//                 <article className="book-card glass">
//                   <div
//                     className="book-cover"
//                     style={{ backgroundImage: url("${b.cover}") }}
//                     onClick={() => goToBook(b.id)}
//                   />
//                   <div className="book-info">
//                     <span className="author-chip-sm">{b.autor}</span>
//                     <h4
//                       className="book-title-sm"
//                       title={b.name}
//                       onClick={() => goToBook(b.id)}
//                     >
//                       {b.name}
//                     </h4>
//                     {b.comment_of_user && (
//                       <p className="highlight-sm" title={b.comment_of_user}>
//                         “{b.comment_of_user}”
//                       </p>
//                     )}
//                     <div className="card-actions">
//                       <Button
//                         size="sm"
//                         variant="outline-light"
//                         as={Link}
//                         to={`/books/${b.id}`}
//                         className="btn-ghost"
//                       >
//                         Открыть
//                       </Button>
//                       <Button
//                         size="sm"
//                         onClick={() => requireAuth(`/books/${b.id}#rate`)}
//                         className="btn-primary-neon"
//                       >
//                         Оценить
//                       </Button>
//                     </div>
//                   </div>
//                 </article>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// }







// import { useEffect, useState } from 'react';
// import BookApi from '../../entities/BookApi';
// import './MainPage.css';

// export default function MainPage() {
//   const [books, setBooks] = useState([]);       // [{id,name,autor,cover,comment_of_user}, ...]
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let mounted = true;
//     BookApi.getAllBooks()
//       .then((data) => {
//         if (!mounted) return;
//         const list = Array.isArray(data) ? data : (data?.books ?? []);
//         setBooks(list);
//         console.log('Книги:', list);            // для наглядности в консоли
//       })
//       .catch((e) => mounted && setError(e.message || 'Ошибка загрузки'))
//       .finally(() => mounted && setLoading(false));
//     return () => { mounted = false; };
//   }, []);

//   if (loading) return <p className="center">Загрузка…</p>;
//   if (error)   return <p className="center err">Ошибка: {error}</p>;

//   return (
//     <div className="simple-page">
//       <h1>Все книги</h1>
//       <div className="simple-grid">
//         {books.map(b => (
//           <div className="simple-card" key={b.id}>
//             <div
//               className="simple-cover"
//               style={{ backgroundImage: url("${b.cover}") }}
//               aria-label={b.name}
//             />
//             <div className="simple-body">
//               <h3 className="simple-title">{b.name}</h3>
//               <p className="simple-autor">Автор: {b.autor || '—'}</p>
//               {b.comment_of_user && (
//                 <p className="simple-comment">“{b.comment_of_user}”</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState } from 'react';
// import BookApi from '../../entities/BookApi';
// import './MainPage.css';

// export default function MainPage() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let mounted = true;
//     BookApi.getAllBooks()
//       .then((data) => {
//         if (!mounted) return;
//         const list = Array.isArray(data) ? data : (data?.books ?? []);
//         setBooks(list);
//       })
//       .catch((e) => mounted && setError(e.message || 'Ошибка загрузки'))
//       .finally(() => mounted && setLoading(false));
//     return () => { mounted = false; };
//   }, []);

//   if (loading) return <div className="pretty-page"><div className="skeleton">Загрузка…</div></div>;
//   if (error)   return <div className="pretty-page"><p className="err">Ошибка: {error}</p></div>;

//   return (
//     <div className="pretty-page">
//       <header className="hero">
//         <h1>Коллекция книг <span>BookClub</span></h1>
//         <p>Комментарии</p>
//       </header>

//       <section className="grid">
//         {books.map(b => (
//           <article className="card glass" key={b.id}>
//             <div
//               className="cover"
//               style={{ backgroundImage: url("${b.cover}") }}
//               aria-label={b.name}
//             />
//             <div className="info">
//               <div className="autor-chip">{b.autor || 'Автор неизвестен'}</div>
//               <h3 className="title" title={b.name}>{b.name}</h3>
//               {b.comment_of_user && (
//                 <p className="comment">“{b.comment_of_user}”</p>
//               )}
//             </div>
//           </article>
//         ))}
//       </section>
//     </div>
//   );
// }





import { useEffect, useState } from 'react';
import BookApi from '../../entities/BookApi';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './MainPage.css';

export default function MainPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    BookApi.getAll()
      .then(data => {
        const list = Array.isArray(data) ? data : (data?.books ?? []);
        if (mounted) setBooks(list);
      })
      .catch(e => mounted && setErr(e.message || 'Ошибка загрузки'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const renderStars = (v) => {
    const val = Number(v || 0);
    if (!val) return <span className="stars muted">—</span>;
    const full = Math.floor(val);
    const half  = val - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <span className="stars" aria-label={`Рейтинг ${val.toFixed(1)} из 5`}>
        {'★'.repeat(full)}{half?'☆':''}{'☆'.repeat(empty)}
        <span className="stars-val">{val.toFixed(1)}</span>
      </span>
    );
  };

  if (loading) return <div className="main-page"><div className="loader">Загрузка…</div></div>;
  if (err)      return <div className="main-page"><p className="error">{err}</p></div>;

  return (
    <div className="main-page">
      <header className="hero">
        <h1>Коллекция книг <span>BookClub</span></h1>
        <p>Обложки, авторы и первые впечатления читателей</p>
      </header>

      {/* КАРУСЕЛЬ НА ВЕСЬ ЭКРАН ПО ГОРИЗОНТАЛИ */}
      <section className="carousel-wrap">
        <Swiper
          modules={[Navigation]}
          navigation                     // стрелки вперёд/назад
          slidesPerView={1.2}           // одна большая + чуть видно следующую
          spaceBetween={16}
          loop={books.length > 2}
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 18 },
            1024:{ slidesPerView: 3.1, spaceBetween: 20 },
            1400:{ slidesPerView: 4.1, spaceBetween: 22 },
          }}
          className="books-swiper"
        >
          {books.map(b => (
            <SwiperSlide key={b.id}>
              <article className="book-card glass">
                <div
                  className="book-cover"
                  style={{ backgroundImage: url("${b.cover || '/no-cover.png'}") }}
                  aria-label={b.name}
                />
                <div className="book-info">
                  <h3 className="book-title" title={b.name}>{b.name}</h3>
                  <p className="book-autor">Автор: {b.autor || '—'}</p>
                  <div className="meta-row">
                    {renderStars(b.avgRating)}
                    <span className="reviews"> {b.reviewsCount ?? '—'} отзыв(ов)</span>
                  </div>
                  {b.comment_of_user && (
                    <p className="book-comment">“{b.comment_of_user}”</p>
                  )}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* На всякий случай — сетка под каруселью */}
      <section className="grid">
        {books.map(b => (
          <article className="grid-card glass" key={`g-${b.id}`}>
            <div className="grid-cover" style={{ backgroundImage: url("${b.cover || '/no-cover.png'}") }} />
            <div className="grid-info">
              <div className="grid-autor">{b.autor || '—'}</div>
              <h4 className="grid-title" title={b.name}>{b.name}</h4>
              <div className="grid-meta">
                {renderStars(b.avgRating)}
                <span className="reviews">{b.reviewsCount ?? '—'}</span>
              </div>
              {b.comment_of_user && <p className="grid-comment">“{b.comment_of_user}”</p>}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}