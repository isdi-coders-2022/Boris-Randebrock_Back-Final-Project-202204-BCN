const customError = require("./customError");

describe("Given the customError function", () => {
  describe("When invoked with a statusCode, customMessage and originalMessage", () => {
    test("Then it should return a new error with its corresponding messages", () => {
      const originalMessage = "Error";
      const customMessage = "Not implemented";
      const statusCode = 501;

      const newError = new Error("Error");
      newError.statusCode = 501;
      newError.customMessage = "Not implemented";

      const returnedError = customError(
        statusCode,
        customMessage,
        originalMessage
      );

      expect(returnedError).toEqual(newError);
    });
  });
});
