const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const songRouter = require("./routers/songRouter");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:4000",
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:4085",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:5002",
    "https://boris-randebrock-front-final-project-202204-bcn.netlify.app/",
    "https://boris-randebrock-front-final-project-202204-bcn.netlify.app",
  ],
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/", songRouter);

module.exports = app;
