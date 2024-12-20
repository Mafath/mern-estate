export  const errorHandler = (statusCode, message) => {
  //we are creating an error here by using JS error constructor
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  //now we can throw or return the error
  return error;
};