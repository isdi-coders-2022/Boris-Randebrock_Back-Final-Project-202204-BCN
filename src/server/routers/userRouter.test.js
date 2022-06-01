require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const connectDB = require("../../db");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

// beforeEach(async () => {
//   users = await User.create([
//     {
//       name: "John Doe",
//       username: "johndoe",
//       password: "password",
//     },
//     {
//       name: "Jane Doe",
//       username: "janedoe",
//       password: "password",
//     },
//   ]);
//   await User.create(users[0]);
//   await User.create(users[1]);
// });

// afterEach(async () => {
//   await User.deleteMany({});
// });

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a post /users/register endpoint", () => {
  describe("when it receives a request with a new user", () => {
    test("Then it should respond with status 201 and a new user created", async () => {
      const newUser = {
        name: "Inigo",
        username: "inigo",
        password: "password",
      };

      const { body } = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(201);

      expect(body).toHaveProperty("username", newUser.username);
    });
  });
});
