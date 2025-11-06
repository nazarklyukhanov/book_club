import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
// import './App.css';

import UserApi from './entities/UserApi';
import { setAccessToken } from './shared/axiosInstance';
import MainPage from './pages/MainPage/MainPage';
import AddNewBookPage from './pages/AddNewBookPage/AddNewBookPage';
import OneBookPage from './pages/OneBookPage/OneBookPage';
import Layout from './app/layout/Layout';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const { data } = await UserApi.refreshTokens();
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/addbook" element={<AddNewBookPage user={user} />} />    
        <Route path="/books/:id" element={<OneBookPage />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
      </Route>
    </Routes>
  );
}

export default App;
