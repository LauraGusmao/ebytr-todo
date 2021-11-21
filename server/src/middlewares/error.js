module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: err.details[0].message },
    });
  }
  console.log(err);
  let statusCode;

  switch (err.error.code) {
    case 'invalid_data':
      statusCode = 422;
      break;
    case 'unauthorized':
      statusCode = 401;
      break;
    default:
      statusCode = 500;
  }

  return res.status(statusCode).json(err);
};
