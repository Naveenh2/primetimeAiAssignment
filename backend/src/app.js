const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const xss = require('xss-clean');
const { StatusCodes } = require('http-status-codes');
const env = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const { swaggerUi, specs } = require('./docs/swagger');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: false
  })
);
app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(xss());

app.get('/health', (_req, res) => {
  res.status(StatusCodes.OK).json({ success: true, message: 'PrimeTrade backend is healthy' });
});

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use((_req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, message: 'Route not found. Check /api/v1/docs' });
});

app.use(errorHandler);

module.exports = app;
