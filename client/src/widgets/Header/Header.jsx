import { NavLink, Link } from "react-router";
import UserApi from "../../entities/UserApi";
import { setAccessToken } from "../../shared/axiosInstance";
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Header({ user, setUser }) {
  async function handleSignOut() {
    await UserApi.signOut();
    setAccessToken("");
    setUser(null);
  }

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          📚 BookClub
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={NavLink} 
              to="/"
              className={({ isActive }) => isActive ? "active fw-bold" : ""}
            >
              Главная
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/reviews"
              className={({ isActive }) => isActive ? "active fw-bold" : ""}
            >
              Отзывы
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/addbook"
              className={({ isActive }) => isActive ? "active fw-bold" : ""}
            >
              Добавить книгу
            </Nav.Link>
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Привет, {user?.username}!
                </Navbar.Text>
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  onClick={handleSignOut}
                  className="text-danger"
                >
                  Выход
                </Nav.Link>
              </>
            ) : (
              <Nav.Link 
                as={Link} 
                to="/auth"
                className="btn btn-primary text-white"
              >
                Вход / Регистрация
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}