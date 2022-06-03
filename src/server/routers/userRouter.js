const express = require("express");
const { validate } = require("express-validation");

const {
  userRegister,
  userLogin,
} = require("../../controllers/userControllers");

const {
  credentialsRegisterSchema,
  credentialsLoginSchema,
} = require("../schemas/userCredentials");

const userRouter = express.Router();

userRouter.post("/register", validate(credentialsRegisterSchema), userRegister);
userRouter.post("/login", validate(credentialsLoginSchema), userLogin);

module.exports = userRouter;
