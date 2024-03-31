const Joi = require('joi');

const customerCreateSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    isActivated: Joi.boolean().required()
});

const customerLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

function validateCreateCustomer(req, res, next) {
    const { error } = customerCreateSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
}

function validateLoginCustomer(req, res, next) {
    const { error } = customerLoginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
}

module.exports = {
    validateCreateCustomer,
    validateLoginCustomer
};
