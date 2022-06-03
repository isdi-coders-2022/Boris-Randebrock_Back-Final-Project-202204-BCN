const { Joi } = require("express-validation");

const credentialsRegisterSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(30)
      .messages({ message: "A name is Required" })
      .required(),
    username: Joi.string()
      .max(30)
      .messages({ message: "A username is Required" })
      .required(),
    password: Joi.string()
      .max(20)
      .messages({ message: "A Password is Required" })
      .required(),
  }),
};

const credentialsLoginSchema = {
  body: Joi.object({
    username: Joi.string()
      .max(30)
      .messages({ message: "A username is Required" })
      .required(),
    password: Joi.string()
      .max(20)
      .messages({ message: "A password is reqiuired" })
      .required(),
  }),
};

module.exports = { credentialsRegisterSchema, credentialsLoginSchema };
