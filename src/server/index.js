const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const songRouter = require("./routers/songRouter");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/", songRouter);

module.exports = app;
