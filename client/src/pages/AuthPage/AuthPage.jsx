import SignUpForm from "../../features/SignUpForm/SignUpForm";
import SignInForm from "../../features/SignInForm/SignInForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        className="form-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          maxWidth: "400px",
          width: "100%",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {isSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <SignInForm setUser={setUser} />
        )}

        {isSignUp ? (
          <>
            <p>Уже есть учетная запись?</p>
            <span
              className="auth-link"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                display: "inline-block",
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "6px",
              }}
            >
              Войти
            </span>
          </>
        ) : (
          <>
            <p>Еще нет учетной записи?</p>
            <span
              className="auth-link"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                display: "inline-block",
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "600",
                borderRadius: "6px",
              }}
            >
              Создать
            </span>
          </>
        )}
      </div>
    </div>
  );
}
