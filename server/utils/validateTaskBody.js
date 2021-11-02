const Joi = require('joi');

module.exports = (body) => Joi.object({
  description: Joi.string().required(),
  status: Joi.string().required(),
}).validate(body);
