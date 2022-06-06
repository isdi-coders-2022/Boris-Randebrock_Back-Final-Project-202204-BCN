require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../db/models/User");

const userRegister = async (req, res, next) => {
  const { name, username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    const error = new Error();
    error.statusCode = 409;
    error.message = "This user or password already exists! Please try again...";

    next(error);
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const NewUser = { name, username, password: encryptedPassword };

    await User.create(NewUser);

    res.status(201).json({ username });
  } catch (error) {
    error.statusCode = 400;
    error.message = "Wrong user data... please try again!";

    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const queryFindOne = { username };

    const user = await User.findOne(queryFindOne);

    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        const userData = {
          username: user.username,
          password: user.password,
          id: user.id,
        };

        const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);

        res.status(200).json({ token });
      }
    } else {
      const error = new Error();
      error.statusCode = 401;
      error.CustomMessage = "Wrong username or password!";
      next(error);
      return;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister, userLogin };
