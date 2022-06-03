require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const connectDB = require("../../db");
const User = require("../../db/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  const user = await User.create([
    {
      name: "John Doe",
      username: "johndoe",
      password: "password",
    },
    {
      name: "Jane Doe",
      username: "janedoe",
      password: "password",
    },
  ]);
  await User.create(user[0]);
  await User.create(user[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a post /user/register endpoint", () => {
  describe("when it receives a request with a new user", () => {
    test("Then it should respond with status 201 and a new user created", async () => {
      const newUser = {
        name: "Inigo",
        username: "inigo",
        password: "password",
      };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(201);

      expect(body).toHaveProperty("username", newUser.username);
    });
  });
});

describe("Given a post 'user/register' endpoint", () => {
  describe("When it receives a request with a valid user", () => {
    test("Then it should respond with status 201 and a token", async () => {
      const testUser = {
        username: "winny",
        password: "the-pooh",
        name: "Winny",
      };

      await request(app).post("/user/register").send(testUser).expect(201);
    });
  });
  describe("When it receives a request with an invalid user", () => {
    test("Then it should respond with status 400 ans an error message", async () => {
      const newerror = new Error();
      const testUser = { newerror };
      await request(app).post("/user/login").send(testUser).expect(400);
    });
  });

  // describe("When it receives a request with an not yet invented error", () => {
  //   test("Then it should call the next(error)", async () => {
  //     const testUser = {
  //       username: "windy the pooh",
  //       password: "the-pooh-pooh",
  //     };

  //     await request(app).post("/user/login").send(testUser).expect(401);

  //     const { token } = await request(app)
  //       .post("/user/login")
  //       .send({ username: testUser.username, password: testUser.password })
  //       .expect(401);

  //     expect(token).toHaveBeenCalled();
  //   });
  // });
});
