import joi from "joi";

export const productScheme = joi.object({
  name: joi.string().min(3).max(255).required(),
  description: joi.string().min(10).required(),
  price: joi.number().positive().required(),
  category_id: joi.number().integer().positive().required()
});

export const productUpdateScheme = joi.object({
  name: joi.string().min(3).max(255),
  description: joi.string().min(10),
  price: joi.number().positive(),
  category_id: joi.number().integer().positive(),
});

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map((detail) => detail.message) });
  }
  next();
};