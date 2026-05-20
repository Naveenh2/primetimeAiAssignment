const { StatusCodes } = require('http-status-codes');

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!result.success) {
    return next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Validation failed',
      details: result.error.flatten()
    });
  }

  req.body = result.data.body;
  req.params = result.data.params;
  req.query = result.data.query;
  return next();
};

module.exports = validate;
