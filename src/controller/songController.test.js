const song = require("../db/models/Song");
const { getSongs } = require("./songController");

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
