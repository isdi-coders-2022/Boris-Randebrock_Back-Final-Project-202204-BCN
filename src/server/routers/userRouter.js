const express = require("express");
const { validate } = require("express-validation");

const { userRegister } = require("../../controllers/userControllers");

const { credentialsRegisterSchema } = require("../schemas/userCredentials");

const userRouter = express.Router();

userRouter.post("/register", validate(credentialsRegisterSchema), userRegister);

module.exports = userRouter;
