const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    details: err.details || undefined
  });
};

module.exports = errorHandler;
