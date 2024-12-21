exports.generateResponse = data => ({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  });
  
  exports.generateError = (message, statusCode = 400) => ({
    status: 'fail',
    message,
  });
  