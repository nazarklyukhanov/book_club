import { useState } from 'react';
import { useNavigate } from 'react-router';
import './SignUpForm.css';
import { UserValidator } from '../../entities/UserValidator';
import UserApi from '../../entities/UserApi';
import { setAccessToken } from '../../shared/axiosInstance';
import FormInput from '../../shared/FormInput';

export default function SignUpForm({ setUser }) {
  const initialValue = { username: '', email: '', password: '' };
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState(initialValue);

  const inputHandler = (event) => {
    setSignUpData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignUpData(signUpData);

    if (!isValid) {
      alert(validationError);
      return;
    }
    const { statusCode, data, error } = await UserApi.signUp(signUpData);
    if (statusCode === 201) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate('/');
      setSignUpData(initialValue);
    } else {
      alert(error || 'Ошибка при регистрации');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={signUpHandler}>
        <FormInput
          placeholder=" "
          name="username"
          type="text"
          required
          onChange={inputHandler}
          value={signUpData.username}
          label="Имя"
        />
        <FormInput
          placeholder=" "
          name="email"
          type="email"
          required
          onChange={inputHandler}
          value={signUpData.email}
          label="Почта"
        />
        <FormInput
          placeholder=" "
          name="password"
          type="password"
          required
          onChange={inputHandler}
          value={signUpData.password}
          label="Пароль"
        />
        <button className="form-action-button">Зарегистрироваться</button>
      </form>
    </div>
  );
}