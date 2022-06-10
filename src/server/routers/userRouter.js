const express = require("express");
const { validate } = require("express-validation");

const { userRegister, userLogin } = require("../../controller/userController");

const { credentialsRegisterSchema } = require("../schemas/userCredentials");

const userRouter = express.Router();

userRouter.post("/register", validate(credentialsRegisterSchema), userRegister);
userRouter.post("/login", userLogin);

module.exports = userRouter;
