const bcrypt = require("bcrypt");
const User = require("../db/models/Users");
const { userRegister } = require("./userControllers");

const mockNewUser = {
  name: "Inigo",
  username: "Montoya",
  password: "1234",
};

jest.mock("../db/models/Users", () => ({
  findOne: jest.fn(),
  create: jest.fn(() => mockNewUser),
}));

jest.mock("bcrypt", () => ({ compare: jest.fn(), hash: jest.fn() }));

describe("Given the registerUser function", () => {
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
  describe("When it is called with the wrong password", () => {
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
