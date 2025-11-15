require("dotenv").config();
const express = require("express");
const apiRouter = require("./routes/api.router");
const serverConfig = require("./config/server.config");
// const process = require('process')
const aiRouter = require('./routes/ai.router')
const cors = require('cors'); // добавил

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use("/api", apiRouter);
app.use('/api/ai', aiRouter); // вот здесь вопрос правильно или нет или вдругое место ставить)


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


