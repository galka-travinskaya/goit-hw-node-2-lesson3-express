const Joi = require("joi");

const schemaCreateCat = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(1).max(40).required(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateCat = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  age: Joi.number().integer().min(1).max(40).optional(),
  isVaccinated: Joi.boolean().optional(),
}).or('name', 'age', 'isVaccinated');

const schemaUpdateStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    // не могу записать реплейс(/*/g, "'")
    next({ status: 400, message: err.message.replace() });
  }
};

module.exports = {
  validationCreateCat: async (req, res, next) => {
    return await validate(schemaCreateCat, req.body, next);
  },
  validationUpdateCat: async (req, res, next) => {
    return await validate(schemaUpdateCat, req.body, next);
  },
  validationUpdateStatusCat: async (req, res, next) => {
    return await validate(schemaUpdateStatusCat, req.body, next);
  },
};
