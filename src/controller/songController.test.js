const song = require("../db/models/Song");
const { mockSong } = require("../mocks/mocksSongs");
const {
  getSongs,
  deleteSong,
  getSongById,
  createSong,
} = require("./songController");

describe("Given the getSongs function", () => {
  describe("When the function is called", () => {
    test("Then the function should return a list of songs", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const songsMock = [
        { title: "Song 1", artist: "Artist 1", youtubeVideo: "Youtube 1" },
      ];
      const next = jest.fn();
      song.find = jest.fn().mockResolvedValue(songsMock);

      const expectedStatusCode = 200;

      await getSongs(null, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(songsMock);
    });
  });
  describe("When the function is called and there is an error", () => {
    test("Then the function should return an error", async () => {
      const next = jest.fn();
      song.find = jest.fn().mockRejectedValue(new Error());

      const expectedStatusCode = 500;

      await getSongs(null, null, next);

      expect(next).toHaveBeenCalledWith(new Error());
      expect(expectedStatusCode).toBe(500);
    });
  });
});

describe("Given the deleteSong function", () => {
  describe("When the function is called", () => {
    test("Then the function should delete a song", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        params: { id: "1" },
      };

      const next = jest.fn();
      song.findOneAndDelete = jest.fn().mockResolvedValue(req);

      const expectedStatusCode = 200;

      await deleteSong(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: "Song deleted" });
    });
  });
});

describe("Given the getSongById function", () => {
  describe("When the function is called", () => {
    test("Then the function should return a song", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        params: { id: "1" },
      };

      const next = jest.fn();
      song.findById = jest.fn().mockResolvedValue(req);

      const expectedStatusCode = 200;

      await getSongById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ song: req });
    });
  });
  describe("When the function is called and there is an error", () => {
    test("Then the function should return an error", async () => {
      song.findById = jest.fn().mockResolvedValue(null);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        params: { id: "justWrong" },
      };

      const next = jest.fn();

      await getSongById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When the function is called and there is no song", () => {
    test("Then the function should return an error", async () => {
      song.findById = jest.fn().mockRejectedValue(null);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { id: "justWrong" },
      };
      const next = jest.fn();

      await getSongById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the createSong function", () => {
  describe("When the function is called", () => {
    const req = {
      body: mockSong,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then the function should create a song", async () => {
      const next = jest.fn();
      song.create = jest.fn().mockResolvedValue(req);

      const expectedStatusCode = 201;

      await createSong(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: "Song created" });
    });
  });
  describe("When the function is called and there is an error", () => {
    test("Then the function should return an error", async () => {
      const req = {
        body: mockSong,
      };
      const next = jest.fn();
      song.create = jest.fn().mockRejectedValue(Error);

      await createSong(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
