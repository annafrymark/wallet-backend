const Joi = require('joi');

const addTransactionSchema = Joi.object({
  category: Joi.string(),
  type: Joi.string().valid("+", "-").required(),
  date: Joi.number().required(),
  comment: Joi.string().min(0).max(25),
  sum: Joi.string().required(),
  owner: Joi.string().required(),
});

const editTransactionSchema = Joi.object({
  category: Joi.string().alphanum(),
  type: Joi.string().valid("+", "-"),
  dat: Joi.date(),
  comment: Joi.string().alphanum().max(25),
  sum: Joi.string(),
}).or("category", "type", "data", "comment", "sum");

const sortTransactionsSchema = Joi.object({
  year: Joi.date(),
  month: Joi.date(),
});

module.exports = {addTransactionSchema, editTransactionSchema, sortTransactionsSchema};