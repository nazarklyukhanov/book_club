import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
// import './App.css';

import UserApi from "./entities/UserApi";
import { setAccessToken } from "./shared/axiosInstance";
import MainPage from "./pages/MainPage/MainPage";
import AddNewBookPage from "./pages/AddNewBookPage/AddNewBookPage";
import OneBookPage from "./pages/OneBookPage/OneBookPage";
import Layout from "./app/layout/Layout";
import AuthPage from "./pages/AuthPage/AuthPage";
import RaitingPage from "./pages/RaitingPage/RaitingPage";
import BookApi from "./entities/BookApi";
import MyBooksPage from "./pages/MyBooksPage/MyBooksPage";
import AIChat from './components/AIChat'; //  добавил

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  async function fetchUser() {
    try {
      const { data } = await UserApi.refreshTokens();
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchBooks() {
    const data = await BookApi.getAllBooks();
    console.log(data);
    setBooks(data.data);
  }

  useEffect(() => {
    fetchUser();
    fetchBooks();
  }, []);

  return (
  <div>
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route path="/" element={<MainPage books={books} />} />
        <Route path="/addbook" element={<AddNewBookPage user={user} />} />
        <Route path="/books/:id" element={<OneBookPage  />} />
        <Route path="/raiting" element={<RaitingPage />} />
        {/* <Route path="/mybooks" element={<MyBooksPage user={user}/>} /> */}
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
      </Route>
    </Routes>

      <AIChat />
</div>
  );
}

export default App;
