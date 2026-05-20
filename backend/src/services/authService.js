const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const prisma = require('../config/prisma');
const env = require('../config/env');
const ApiError = require('../utils/apiError');

const generateToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
};

const register = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'USER'
    }
  });

  const token = generateToken(user);
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const token = generateToken(user);
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  };
};

module.exports = { register, login };
