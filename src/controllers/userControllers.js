require("dotenv").config();
const bcrypt = require("bcrypt");
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

module.exports = { userRegister };
