const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(50)
        .optional(),

    email: Joi.string(),

    password: Joi.string(),

    age: Joi.number()
        .integer()
        .min(3)
        .max(125)
        .optional(),

    gender: Joi.string(),

    cars: Joi.array().optional(),

    _id: Joi.any().optional(),

    __v: Joi.any().optional(),

    full_name: Joi.string().optional(),

    userCars: Joi.array().optional(),

    id: Joi.string()

});
