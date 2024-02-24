import {luhnCheck} from "../../core/helpers/helpers";
import Joi from 'joi';

export const saveCardValidator = Joi.object({

    authorization: Joi.string()
        .required()
        .pattern(/^pk_test_[A-Za-z0-9]{16}$/)
        .message('The format of the Authorization field is invalid'),

    cardNumber: Joi.string()
        .trim()
        .pattern(/^\d{13,16}$/)
        .custom((value, helpers) => {
            const cleanedValue = value.replace(/\s+/g, '').replace(/-/g, '');
            if (!luhnCheck(cleanedValue)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'string.pattern.base': 'Card invalid',
            'any.invalid': 'Card invalid'
        }),

    cvv: Joi.string()
        .trim()
        .pattern(/^\d{3,4}$/),

    expirationMonth: Joi.number()
        .integer()
        .min(1)
        .max(12),

    expirationYear: Joi.string()
        .length(4)
        .pattern(/^\d{4}$/)
        .custom((value, helpers) => {
            const currentYear = new Date().getFullYear();
            const maxYear = currentYear + 5;

            if (parseInt(value) < currentYear || parseInt(value) > maxYear) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'string.pattern.base': 'Card invalid',
            'any.invalid': 'Card invalid'
        }),

    email: Joi.string()
        .email()
        .custom((value, helpers) => {
            const domain = value.split('@')[1];
            const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
            if (!allowedDomains.includes(domain)) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'string.email': 'Email must be valid',
            'any.invalid': 'Email domain not allowed'
        })
});