const Joi = require('joi');

const userSignInSchema = Joi.object({
    password: Joi.string().min(6).max(12).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).required(),
    email: Joi.string().email().required(),
});

const userSignUpSchema = Joi.object({
    password: Joi.string().min(6).max(12).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().min(1).required(),
});

const userUpdateSchema = Joi.object({
    password: Joi.string().min(6).max(12).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().min(1).required(),
}).or('password', 'email', 'firstName',);

module.exports = { userSignInSchema, userSignUpSchema, userUpdateSchema };