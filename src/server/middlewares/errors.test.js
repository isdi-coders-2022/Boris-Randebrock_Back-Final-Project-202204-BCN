const { generalError, notFoundError } = require("./errors");

describe("Given the errors function", () => {
  describe("When invoked with an error without statusCode", () => {
    test("Then it should call res status and json method with 500 end the message 'General Peterson'", () => {
      const expectedStatusCode = 500;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const recievedError = new Error();
      const expectedError = {
        error: true,
        message: "General Peterson",
      };

      generalError(recievedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When invoked with the statusCode 409 and the message 'Conflict Error'", () => {
    test("Then it should call the res status 409 and the message 'Conflict Error'", () => {
      const recievedError = new Error();
      recievedError.customMessage = "Conflict Error";
      recievedError.statusCode = 409;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatusCode = 409;
      const expectedError = {
        error: true,
        message: "Conflict Error",
      };

      generalError(recievedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the notFoundError", () => {
  describe("When invoked with the statusCode 404 and the message'Endpoint not found'", () => {
    test("Then it should call the res status 404 and the message'Endpoint not found'", () => {
      const next = jest.fn();

      notFoundError(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
