const customError = (statusCode, customMesssage, originalMessage = "") => {
  const error = new Error(originalMessage);
  error.statusCode = statusCode;
  error.customMessage = customMesssage;
  error.originalMessage = originalMessage;

  return error;
};

module.exports = customError;
