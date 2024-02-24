import Joi from 'joi';

export const getCardValidator = Joi.object({
    authorization: Joi.string()
        .required()
        .min(16)
        .max(16)
        .messages({
            'any.required': 'The Authorization field is required',
            'string.min': 'The Authorization field must be exactly 16 characters long',
            'string.max': 'The Authorization field must be exactly 16 characters long'
        })
}).unknown(true);
