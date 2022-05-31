const customError = require("./customError");

describe("Given the customError function", () => {
  describe("When invoked with a statusCode, customMessage and originalMessage", () => {
    test("Then it should return a new error with its corresponding messages", () => {
      const originalMessage = "Error";
      const customMessage = "Jeee... this is bad";
      const statusCode = 501;

      const newError = new Error("Error");
      newError.statusCode = 501;
      newError.customMessage = "Jeee... this is bad";

      const returnedError = customError(
        statusCode,
        customMessage,
        originalMessage
      );

      expect(returnedError).toEqual(newError);
    });
  });
});
