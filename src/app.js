const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const routes = require("./routes/index");
const errorMiddleware = require("./middlewares/error.middlware");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(routes); // <- YE MISSING THA
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Task Management API Running 🚀')
})

module.exports = app;
// npm install express pg dotenv bcrypt jsonwebtoken joi cors helmet morgan express-rate-limit cookie-parser compression
// npm install --save-dev nodemon
// "scripts": {
//   "start": "node server.js",
//   "dev": "nodemon server.js"
// }