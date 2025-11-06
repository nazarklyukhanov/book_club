
import './AuthPage.css';
import SignUpForm from '../../features/SignUpForm/SignUpForm';
import SignInForm from '../../features/SignInForm/SignInForm';
import { useState } from 'react';

export default function AuthPage({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="app-container">
      <div className="form-container">
        {isSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <SignInForm setUser={setUser} />
        )}
        {isSignUp ? (
          <>
            <p>Уже есть учетная запись?</p>
            <span className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
              Войти
            </span>
          </>
        ) : (
          <>
            <p>Еще нет учетной записи?</p>
            <span className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
              Создать
            </span>
          </>
        )}
      </div>
    </div>
  );
}