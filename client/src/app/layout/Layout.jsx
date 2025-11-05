import { Outlet } from 'react-router';
// import './Layout.css';
import Header from '../../widgets/Header/Header';

export default function Layout({ user, setUser }) {                            
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet />

    </>
  );
}