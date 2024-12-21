export  const errorHandler = (statusCode, message) => {
  const error = new Error();  //we are creating an error here by using JS error constructor
  error.statusCode = statusCode;
  error.message = message;
  
  //now we can throw or return the error
  return error;
};