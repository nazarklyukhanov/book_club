
// cd server 
   
// npm init -y
// npm init @eslint/config@latest
// npx create-gitignore node
// npm install cors



// создать файл .env в папке server:
// DB="postgres://postgres:123@localhost:5432/p1w3d4_example"
// PORT=3000
// ACCESS_TOKEN_SECRET=
// REFRESH_TOKEN_SECRET=


// создать файл .env_example в папке server:
// DB="[dialect]://[user]:[password]@[host]:[port]/[database]"
// PORT=XXXX
// ACCESS_TOKEN_SECRET=
// REFRESH_TOKEN_SECRET=

// создать .sequelizerc  в папке server и вложить:
// const path = require('path');
// require('dotenv').config();
// module.exports = {
//   config: path.resolve('src', 'db', 'config', 'database.json'),
//   'models-path': path.resolve('src', 'db', 'models'),
//   'seeders-path': path.resolve('src', 'db', 'seeders'),
//   'migrations-path': path.resolve('src', 'db', 'migrations'),
// };

// устанавливаем sequelize и другие зависимости
// npm i sequelize sequelize-cli pg pg-hstore express dotenv morgan nodemon
// npx sequelize init

// в моделях в index.js на самый верх добавить require('dotenv').config();

// npm i bcrypt cookie-parser jsonwebtoken   (для аутентификации)

// добавить в db -> config -> в файл database.json

// {
//     "development": {
//       "use_env_variable": "DB"
//     },
//     "test": {
//       "use_env_variable": "DB"
//     },
//     "production": {
//       "use_env_variable": "DB"
//     }
//   }

// скрипты для удобства (package.json):
// "start": "node ./src/server.js",
// "dev": "nodemon ./src/app.js --ext js,css,json",
// "mig": "npx sequelize db:migrate",
// "undoMig": "npx sequelize db:migrate:undo:all",
// "remigrate": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate",
// "seed": "npx sequelize db:seed:all",
// "undoSeed": "npx sequelize db:seed:undo:all",
// "createDB": "npx sequelize db:create",
// "dropDB": "npx sequelize db:drop",
// "dbReset": "npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate",
// "db": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all",
// "db:remigrate": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all"

// подключаем бд

// npx sequelize db:create

// создаём модели и миграции:
//npx sequelize model:generate --name User --attributes name:string,email:string,password:string
// npx sequelize-cli model:generate --name Meet --attributes address:string,guests:integer,user_id:integer

// в миграции добавляем
// добавляем дефолтные значения для createdAt и updatedAt
// defaultValue: Sequelize.fn('NOW'), -- дефолтное значение

// allowNull: false,   - туда, где не может быть пустых ячеек

// добавить туда, где user email строчку
// 
//  unique: true,

// связь в миграциях:
// references: {model: "", key: ""}   // во множественном числе и с большой буквы

// костыль для моделей от Димы
// drug_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: 'drugs_id', //  добавить это
//       },

// связи в моделях:
// если связь ManyToMany (через связующую таблицу), то прописываем связь в модклях только у тех таблиц, которые надо связать
// Пример:
//  class User extends Model {
// static associate({Post, UserPost}) {
//     this.belongsToMany(Post, {
//       foreignKey: 'user_id',
//       through: UserPost,
//       as: 'Comments'
//     })
//   }
// }

// связь OneToMany
// Пример:
// static associate({Comment}) {
//     this.hasMany(Comment, {foreignKey: "post_id", as: "comments"})
//   }
// static associate({ Post }) {
//     this.belongsTo(Post, { foreignKey: "post_id", as: "post" });
// }

// добавляем в модели проверки на валидность email

// static validateEmail(email) {
//       const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
//       return emailPattern.test(email);
//     }

//     static validatePassword(password) {
//       const hasUpperCase = /[A-Z]/;
//       const hasLowerCase = /[a-z]/;
//       const hasNumbers = /\d/;
//       const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
//       const isValidLength = password.length >= 8;

//       if (
//         !hasUpperCase.test(password) ||
//         !hasLowerCase.test(password) ||
//         !hasNumbers.test(password) ||
//         !hasSpecialCharacters.test(password) ||
//         !isValidLength
//       ) {
//         return false;
//       }

//       return true;
//     }

//     static validateLoginData({ email, password }) {
//       if (
//         !email ||
//         typeof email !== 'string' ||
//         email.trim().length === 0 ||
//         !this.validateEmail(email)
//       ) {
//         return {
//           isValid: false,
//           err: 'Email не должен быть пустым и должен быть валидным',
//         };
//       }

//       if (
//         !password ||
//         typeof password !== 'string' ||
//         password.trim().length === 0 ||
//         !this.validatePassword(password)
//       ) {
//         return {
//           isValid: false,
//           err: 'Пароль не должен быть пустым, должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву, один специальный символ и быть не менее 8 символов',
//         };
//       }

//       return {
//         isValid: true,
//         err: null,
//       };
//     }

//     static validateSignUpData({ name, email, password }) {
//       if (!name || typeof name !== 'string' || name.trim().length === 0) {
//         return {
//           isValid: false,
//           err: 'Поле name не должно быть пустым',
//         };
//       }

//       if (
//         !email ||
//         typeof email !== 'string' ||
//         email.trim().length === 0 ||
//         !this.validateEmail(email)
//       ) {
//         return {
//           isValid: false,
//           err: 'Email должен быть валидным',
//         };
//       }

//       if (
//         !password ||
//         typeof password !== 'string' ||
//         password.trim().length === 0 ||
//         !this.validatePassword(password)
//       ) {
//         return {
//           isValid: false,
//           err: 'Пароль не должен быть пустым, должен содержать одну большую букву, одну маленькую, один специальный символ, и не должен быть короче 8 символов',
//         };
//       }

//       return {
//         isValid: true,
//         err: null,
//       };
//     }

//  проверка на валидность постов 

// // static validate({ title, body }) {
//       if (!title || typeof title !== 'string' || title.trim().length === 0)
//         return {
//           isValid: false,
//           err: 'Название не должно быть пустой строкой',
//         };
//       if (!body || typeof body !== 'string' || body.trim().length === 0)
//         return {
//           isValid: false,
//           err: 'Описание не должно быть пустой строкой',
//         };
//       return {
//         isValid: true,
//         err: null,
//       };
//     }


// накатываем миграции
// npx sequelize db:migrate

// засидим таблицы
// npx sequelize-cli seed:generate --name Meet
// при засиживании помним, что пишем название таблицы во множественном числе

// заполняем данными 

        // {
        //   name: "Gendalf",
        //   email: "seryi@mail.ru",
        //   password: "Trashmetal27!"
        // },
        //         {
        //   name: "Frodo",
        //   email: "nesikoltso@gmail.ru",
        //   password: "Trashmetal27!"
        // },


// накатываем сиды
// npx sequelize db:seed:all 

// // ! Откат в сидах в противоположном порядке (важно)

// переходим в src
// server/src

// создаём там папки: 

// configs    (конфигурация сервера, обучалки для сервера)
// services    (посредник для общения контроллера с базой данных. сколько сущностей столько сервисов)
// controllers (основная логика, обработка запросов, вызывает методы сервисов, отправляет ответ от сервера)
// middlewares (промежуточные обработчикию срабатывают до попадания данных в контроллер. могут содержать валидациюб логирование)
// routes (маршрутизацияю направление запроса в нужный эндпойнтю эндпойнт передаст запрос в нужный метод контроллера)

// в папке middlewares создаём файл   

// verifyTokens.js  (промежуточная логика, которая нужна до того, как данные попадут в контроллер)

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

//  в миддлварах создаём verifyTokens.js

// const verifyAccessToken = (req, res, next) => {
//   try {
//     const accessToken = req.headers.authorization.split(' ')[1]; // Bearer <token>
//     const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//     res.locals.user = user;

//     return next();
//   } catch (error) {
//     console.log('Invalid access token', error);
//     return res.status(403).json({ message: 'Forbidden' });
//   }
// };
// const verifyRefreshToken = (req, res, next) => {
//   try {
//     const { refreshToken } = req.cookies;
//     const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     res.locals.user = user;

//     return next();
//   } catch (error) {
//     console.log('Invalid refresh token', error);
//     return res.clearCookie('refreshToken').status(401).json({ message: 'Unauthorized' });
//   }
// };

// module.exports = { verifyAccessToken, verifyRefreshToken };

// в папке routes создаём файлы

// authRouter.js

// const authRouter = require('express').Router();
// const AuthController = require('../controllers/AuthController');
// const { verifyRefreshToken } = require('../middlewares/verifyTokens');

// authRouter.post('/signup', AuthController.signUp);
// authRouter.post('/login', AuthController.login);
// authRouter.get('/logout', AuthController.logout);
// authRouter.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens);

// module.exports = authRouter;

// apiRouter.js  (принимает на себя все роуты)

// const express = require('express');
// // const teaRouter = require('./teaRouter');
// const authRouter = require('./authRouter');
// const apiRouter = express.Router();

// // apiRouter.use('/tea', teaRouter);
// apiRouter.use('/auth', authRouter);

// module.exports = apiRouter;
// (сколько сущностей столько и запросов)

// в роутах создаем файл authRouter.js

// const authRouter = require('express').Router();
// const AuthController = require('../controllers/AuthController');
// const { verifyRefreshToken } = require('../middlewares/verifyTokens');

// authRouter.post('/signup', AuthController.signUp);
// authRouter.post('/login', AuthController.login);
// authRouter.get('/logout', AuthController.logout);
// authRouter.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens);

// module.exports = authRouter;

// nazovi_kak_toRouter.js

// const express = require('express');
// const TeaController = require('../controllers/TeaController');
// const validateId = require('../middlewares/validateId');
// const teaRouter = express.Router();

// teaRouter.get('/', TeaController.getTeas); 
// teaRouter.post('/', TeaController.createTea); 
// teaRouter.get('/:id', validateId, TeaController.getOneTea);
// teaRouter.put('/:id', validateId, TeaController.updateTea);
// teaRouter.delete('/:id', validateId, TeaController.deleteTea);

// module.exports = nazovi_kak_toRouter.js;

// в папке services создаём файлы   (получает данные из бд, но не обрабатывает их)
// AuthService.js

// Nazovi_kak_toServise.js

// // в папке controllers создаём файлы  (получает информацию от сервисов и обрабатывает для пользователя)

// AuthController.js

// Nazovi_kak_toController.js   (логика обработки запросов)

// в src создаём папку utils а в ней файл generateTokens.js

// require('dotenv').config(); // используем переменные из .env
// const jwt = require('jsonwebtoken'); // берем методы из модуля jsonwebtoken
// const jwtConfig = require('../configs/jwtConfig'); // для настрой времени жизни токена

// // payload = user
// const generateTokens = (payload) => ({
//   // токен доступа - короткий
//   accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, jwtConfig.access),
//   // токен обновления - долгий
//   refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, jwtConfig.refresh),
// });

// module.exports = generateTokens;

// создаём папку client

// // npm create vite@latest   создаём client

// cd/client 

// npm i

// создаём файл .env в корне клиента. туда бросаем 

// VITE_API=http://localhost:3000/api

// npm install react-bootstrap bootstrap // если будем им пользоваться
// npm install react-bootstrap-icons
// npm i react-router
// npm i react-router-dom
// npm i axios


// в папке public лежат все файлы, которые мы кокажем пользователю (Image, звуки и т д)

// в папке src 

// в папке  app (основные компоненты приложения)
// в папке app => папка Layout а в ней => Layout.jsx  (элементы интерфейса, которые будут отрисовываться на каждой странице navbar, header)

// import React from "react";
// import NavBar from "../../widgets/NavBar/NavBar";
// import { Outlet } from "react-router";
// import Container from "react-bootstrap/esm/Container";

// export default function Layout({ user, setUser }) {
//   return (
//     <Container>
//       <NavBar setUser={setUser} user={user} />
//       <Outlet />
//     </Container>
//   );
// }

// в папке app => папка Router а в ней => Router.jsx

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router";
// import MainPage from "../../pages/MainPage/MainPage";
// import PostPage from "../../pages/TeaPage/TeaPage";
// import OnePostPage from "../../pages/OneTeaPage/OneTeaPage";
// import Layout from "../Layout/Layout";
// import AuthPage from "../../pages/AuthPage/AuthPage";

// export default function Router({ setUser, user }) {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout user={user} setUser={setUser} />}>
//           <Route path="/" element={<MainPage />} />
//           <Route path="/post" element={<PostPage />} />
//           <Route path="/auth" element={<AuthPage setUser={setUser} />} />
//           <Route path="/post/:postId" element={<OnePostPage user={user} />} />
//           <Route path="*" element={<h1>Нет контента</h1>} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// в папке src => папка entities а в ней => user

// в папке user => UserApi.js

// import axiosInstance from "../../shared/lib/axiosInstance";


// export default class UserApi {
//   static async signup(userData) {
//     const response = await axiosInstance.post("/auth/signup", userData);
//     return response;
//   }

//   static async login(userData) {
//     const response = await axiosInstance.post("/auth/login", userData);
//     return response;
//   }

//   static async logout() {
//     const response = await axiosInstance("/auth/logout");
//     return response;
//   }
// }

// в папке user => UserValidate.js

// export default class UserValidate {
//   static validateEmail(email) {
//     const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
//     return emailPattern.test(email);
//   }

//   static validatePassword(password) {
//     const hasUpperCase = /[A-Z]/;
//     const hasLowerCase = /[a-z]/;
//     const hasNumbers = /\d/;
//     const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
//     const isValidLength = password.length >= 8;

//     if (
//       !hasUpperCase.test(password) ||
//       !hasLowerCase.test(password) ||
//       !hasNumbers.test(password) ||
//       !hasSpecialCharacters.test(password) ||
//       !isValidLength
//     ) {
//       return false;
//     }

//     return true;
//   }

//   static validateLoginData({ email, password }) {
//     if (
//       !email ||
//       typeof email !== "string" ||
//       email.trim().length === 0 ||
//       !this.validateEmail(email)
//     ) {
//       return {
//         isValid: false,
//         err: "Email не должен быть пустым и должен быть валидным",
//       };
//     }

//     if (
//       !password ||
//       typeof password !== "string" ||
//       password.trim().length === 0 ||
//       !this.validatePassword(password)
//     ) {
//       return {
//         isValid: false,
//         err:
//           "Пароль не должен быть пустым, должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву, один специальный символ и быть не менее 8 символов",
//       };
//     }

//     return {
//       isValid: true,
//       err: null,
//     };
//   }

//   static validateSignUpData({ name, email, password, confirmPassword }) {
//     if (!name || typeof name !== "string" || name.trim().length === 0) {
//       return {
//         isValid: false,
//         err: "Поле name не должно быть пустым",
//       };
//     }

//     if (
//       !email ||
//       typeof email !== "string" ||
//       email.trim().length === 0 ||
//       !this.validateEmail(email)
//     ) {
//       return {
//         isValid: false,
//         err: "Email должен быть валидным",
//       };
//     }

//     if (
//       !password ||
//       typeof password !== "string" ||
//       password.trim().length === 0 ||
//       !this.validatePassword(password)
//     ) {
//       return {
//         isValid: false,
//         err:
//           "Пароль не должен быть пустым, должен содержать одну большую букву, одну маленькую, один специальный символ, и не должен быть короче 8 символов",
//       };
//     }

//     if (password !== confirmPassword) {
//       return {
//         isValid: false,
//         err: "Пароли не совпадают",
//       };
//     }

//     return {
//       isValid: true,
//       err: null,
//     };
//   }
// }

// в  src создаём shared/lib => axiosInstance.js

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API,
//   withCredentials: true,
// });

// let accessToken = "";

// function setAccessToken(newToken) {
//   accessToken = newToken;
// }

// axiosInstance.interceptors.request.use((config) => {
//   if (!config.headers.Authorization) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const prevRequest = error.config;
//     if (error.response.status === 403 && !prevRequest.sent) {
//       const response = await axiosInstance("/auth/refreshTokens");
//       accessToken = response.data.accessToken;
//       prevRequest.sent = true;
//       prevRequest.headers.Authorization = `Bearer ${accessToken}`;
//       return axiosInstance(prevRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// export { setAccessToken };

// export default axiosInstance;

// в папке src создаём папку features => LoginForm => LoginForm.jsx

// import React from "react";
// import styles from "./LoginForm.module.css";
// import UserValidate from "../../entities/user/UserValidate";
// import UserApi from "../../entities/user/UserApi";
// import { setAccessToken } from "../../shared/lib/axiosInstance";
// import { useNavigate } from "react-router";

// export default function LoginForm({ setUser }) {
//   const navigate = useNavigate();
//   const loginHandler = async (e) => {
//     try {
//       e.preventDefault();
//       const formData = Object.fromEntries(new FormData(e.target));
//       const { isValid, error } = UserValidate.validateLoginData(formData);
//       if (!isValid) return alert(error);
//       const res = await UserApi.login(formData);
//       setUser({ status: "logged", data: res.data.user });
//       setAccessToken(res.data.accessToken);
//       navigate("/tea");
//     } catch (error) {
//       console.log(error);
//       alert(error.response.data?.message);
//     }
//   };
//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={loginHandler}>
//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Email</div>
//           <input className={styles.input} name="email" type="email" required />
//         </div>
//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Password</div>
//           <input
//             className={styles.input}
//             name="password"
//             type="password"
//             required
//           />
//         </div>
//         <button type="submit" className={styles.submitButton}>
//           Подтвердить
//         </button>
//       </form>
//     </div>
//   );
// }

// в папке features => SignUpForm => SignUpForm.jsx

// import React from "react";
// import styles from "./SignUpForm.module.css";
// import UserApi from "../../entities/user/UserApi";
// import UserValidate from "../../entities/user/UserValidate";
// import { setAccessToken } from "../../shared/lib/axiosInstance";
// import { useNavigate } from "react-router";

// function SignUpForm({ setUser }) {
//   const navigate = useNavigate()
//   const signUpHandler = async (e) => {
//     try {
//       e.preventDefault();
//       const formData = Object.fromEntries(new FormData(e.target));
//       const { isValid, err } = UserValidate.validateSignUpData(formData);
//       if (!isValid) return alert(err);
//       const res = await UserApi.signup(formData);
//       // res.data = { accessToken, user }
//       setUser({ status: "logged", data: res.data.user });
//       setAccessToken(res.data.accessToken);
//       navigate('/tea')
//     } catch (error) {
//       console.log(error);
//       alert(error.response.data.message);
//     }
//   };
//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={signUpHandler}>
//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Name</div>
//           <input className={styles.input} name="name" type="text" required />
//         </div>
//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Email</div>
//           <input className={styles.input} name="email" type="email" required />
//         </div>
//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Password</div>
//           <input
//             className={styles.input}
//             name="password"
//             type="password"
//             required
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <div className={styles.inputLabel}>Repeat Password</div>
//           <input
//             className={styles.input}
//             name="confirmPassword"
//             type="password"
//             required
//           />
//         </div>
//         <button type="submit" className={styles.submitButton}>
//           Подтвердить
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;

// папка Router

// Router.jsx  (все компоненты визуала и переходы между ними)

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router";
// import MainPage from "../../pages/MainPage/MainPage";
// import TeaPage from "../../pages/TeaPage/TeaPage";
// import OneTeaPage from "../../pages/OneTeaPage/OneTeaPage";
// import Layout from "../Layout/Layout";
// import EaglePage from "../../pages/EaglePage/EaglePage";

// export default function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<MainPage />} />
//           <Route path="/tea" element={<TeaPage />} />
//           <Route path="/eagle" element={<EaglePage />} />
//           <Route path="/tea/:teaId" element={<OneTeaPage />} />
//           <Route path="*" element={<h1>Нет контента</h1>} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// папка assets (иконкиб файлики контента, звуки не заложенные в хедере)

// в src создаём папку pages

// набор реактовских компонентов, которые составляют цельную страницу. сколько сртаниц столько и папок

// например 

// EaglePage
// MainPage
// OneTeaPage
// TeaPage


// создаём в src папку widgets (кусочки страницы. например одна карточка, нав бар, форма для добавления карточки)

// NavBar
// TeaAddForm
// TeaCard

// файлы папки client

// main.jsx  (по дефолту)

// App.jsx 

// import { useState } from "react";
// import Router from "./app/Router/Router";
// import { useEffect } from "react";
// import axiosInstance, { setAccessToken } from "./shared/lib/axiosInstance";

// function App() {
//   const [user, setUser] = useState({ status: "logging", data: null });
//   useEffect(() => {
//     axiosInstance("/auth/refreshTokens")
//       .then((res) => {
//         setUser({ status: "logged", data: res.data.user });
//         setAccessToken(res.data.accessToken);
//       })
//       .catch(() => {
//         setUser({ status: "guest", data: null });
//         setAccessToken("");
//       });
//   }, []);
//   return <Router setUser={setUser} user={user} />;
// }

// export default App;

// import Router from "./app/Router/Router";

// function App() {
//   return <Router />;
// }

// export default App;

// main.jsx

// import { createRoot } from "react-dom/client";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(<App />);

