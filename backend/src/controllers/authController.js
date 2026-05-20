const { StatusCodes } = require('http-status-codes');
const authService = require('../services/authService');
const { sendResponse } = require('../utils/apiResponse');

const register = async (req, res) => {
  const data = await authService.register(req.body);
  return sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data
  });
};

const login = async (req, res) => {
  const data = await authService.login(req.body);
  return sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Login successful',
    data
  });
};

module.exports = { register, login };
