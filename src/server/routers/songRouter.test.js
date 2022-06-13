require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const connectDB = require("../../db");
const Song = require("../../db/models/Song");
const { mockSongs } = require("../../mocks/mocksSongs");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await Song.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a get /songs endpoint", () => {
  describe("When a user requests a song", () => {
    it("Then the song should be returned with a status code 200", async () => {
      const { body } = await request(app)
        .get("/songs")
        .send(mockSongs)
        .expect(200);

      expect(body).toEqual([], mockSongs.artist);
    });
  });
});

describe("Given a delete /songs/:id endpoint", () => {
  describe("When invoked", () => {
    test("Then the song should be deleted", async () => {
      Song.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
      const { body } = await request(app)
        .delete("/songs/:_id")
        .send(mockSongs)
        .expect(200);

      expect(body).toEqual({ message: "Song deleted" });
    });
  });
});

describe("Given a get /songs/:id endpoint", () => {
  describe("When invoked", () => {
    test("Then the song should be returned", async () => {
      Song.findById = jest.fn().mockResolvedValueOnce({});

      const { body } = await request(app)
        .get("/songs/:_id")
        .send(mockSongs)
        .expect(200);

      expect(body).toEqual(body);
    });
  });
});

describe("Given a post /songs endpoint", () => {
  describe("When invoked", () => {
    test("Then the song should be created", async () => {
      Song.create = jest.fn().mockResolvedValueOnce({});

      const { body } = await request(app)
        .post("/songs")
        .send(mockSongs)
        .expect(201);

      expect(body).toEqual({ message: "Song created" });

      expect(Song.create).toHaveBeenCalledWith(mockSongs);
    });
  });
});
