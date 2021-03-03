const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string()
        .alphanum()
        .min(1)
        .max(255)
        .required(),

    engine: Joi.number(),

    color: Joi.string(),

    price: Joi.number()
        .min(100)
        .required()
});
