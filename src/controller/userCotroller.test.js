const bcrypt = require("bcrypt");

const User = require("../db/models/User");
const { userRegister, userLogin } = require("./userController");
const {
  mockToken,

  mockNewUser,
} = require("../mocks/mocksUsers");

jest.mock("jsonwebtoken", () => ({ sign: () => mockToken }));

jest.mock("../db/models/User", () => ({
  findOne: jest.fn(() => ({
    username: "username",
    id: "id",
  })),
  create: jest.fn(() => mockNewUser),
}));

jest.mock("bcrypt", () => ({ compare: () => true, hash: jest.fn() }));

describe("Given userLogin function", () => {
  describe("When it's called with correct user credentials", () => {
    test("Then it should call response method status with 200 and method json with a token", async () => {
      const req = {
        body: {
          id: 1,
          username: "username",
          password: "password",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedStatus = 200;

      await userLogin(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });

  describe("When it's called with incorrect user credentials", () => {
    test("Then it should call the next method with the message 'Wrong username or password'", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          id: 1,
          username: "winny",
          password: "the-Pooh",
        },
      };

      const expectedError = new Error();
      expectedError.customMessage = "Wrong username or password";

      const next = jest.fn();

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When the user does not exist", () => {
    test("Then it should call next", async () => {
      const req = {
        body: {
          id: 1,
          username: "wenny",
          password: "the-Poop",
        },
      };

      const expectedError = new Error();

      const next = jest.fn();

      User.findOne = jest.fn().mockRejectedValueOnce(expectedError);
      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the userRegister function", () => {
  describe("When invoked with a new username and passwword", () => {
    test("Then it should call with the status 201 and a new user created", async () => {
      const req = {
        body: { name: "Jordi", username: "jordi", password: "1234" },
      };

      User.findOne.mockImplementation(() => false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedStatus = 201;
      const expectedJson = { username: "jordi" };
      bcrypt.hash.mockImplementation(() => "hashedPassword");
      await userRegister(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When it is called with an existing user in the database", () => {
    test("then it should call the next middleware with an error", async () => {
      const req = {
        body: { name: "Inigo", username: "inigo", password: "1234" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockNext = jest.fn();
      User.findOne.mockImplementation(() => true);
      bcrypt.hash.mockImplementation(() => "hashedPassword");

      await userRegister(req, res, mockNext);
      const expectedError = new Error();
      expectedError.code = 409;
      expectedError.message =
        "This user or password already exists! Please try again...";

      expect(mockNext).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it is called with an existing password", () => {
    test("then it should have been called with status code 400", async () => {
      const req = {
        body: { name: "Inigo", username: "inigo", password: "1234" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: "Wrong user data... please try again!",
      };

      const mockNext = jest.fn();
      User.findOne.mockImplementation(() => false);
      bcrypt.hash.mockImplementation(() => false);

      await userRegister(req, res, mockNext);

      const expectedError = new Error();
      expectedError.code = 400;
      expectedError.customMessage = [
        "TypeError: Wrong user data... please try again!",
      ];

      expect(mockNext).toHaveBeenCalled();
    });
  });
});
