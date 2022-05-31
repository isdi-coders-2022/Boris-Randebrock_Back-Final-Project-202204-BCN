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
});

// InigoMontoya
// $2a$10$pdylXNCZ9k4GgN3naOh84eHYVeoVRQ2IQZay7mV43zM5V.nTvM146
