const Joi = require('joi');

const addEmployeeSchema = Joi.object({
    name: Joi.string().required().max(255).messages({
        'string.base': 'Name must be a string.',
        'any.required': 'Name is required'
    }),

    mobile_no: Joi.string().required().messages({
        'string.email': 'Email must be a valid email address.',
        'any.email': 'Name is required'
    }),

    email: Joi.string().required().email().messages({
        'string.email': 'Email must be a valid email address.',
        'any.email': 'Name is required'
    }),

    role: Joi.string().required().messages({
        'string.base': 'Role must be a string.',
        'any.role': 'Role is required'
    }),

    date_of_birth: Joi.date().iso().less('now').messages({
        'date.base': 'Date of Birth must be a valid date.',
        'date.format': 'Date of Birth must be in YYYY-MM-DD format.',
        'date.less': 'Date of Birth must be in the past.'
    })
});

const updateEmployeeSchema = Joi.object({
    name: Joi.string().optional().max(255).allow(null, '').messages({
        'string.base': 'Name must be a string.',
    }),

    email: Joi.string().optional().email().allow(null, '').messages({
        'string.email': 'Email must be a valid email address.',
    }),
    mobile_no: Joi.string().optional().messages({
        'string.email': 'Email must be a valid email address.',
        'any.email': 'Name is required'
    }),

    role: Joi.string().optional().allow(null, '').messages({
        'string.base': 'Role must be a string.',
    }),

    date_of_birth: Joi.date().iso().less('now').optional().allow(null, '').messages({
        'date.base': 'Date of Birth must be a valid date.',
        'date.format': 'Date of Birth must be in YYYY-MM-DD format.',
        'date.less': 'Date of Birth must be in the past.'
    }),

    employee_id: Joi.number().required().messages({
        'number.base': "Employee should be int",
        'any.required': 'Employee is required'
    }),
    status: Joi.number().optional().allow(null, '').messages({
        'number.base': 'Employee Status is invalid.',
    }),
});

const deleteEmployeeSchema = Joi.object({
    user_id: Joi.number().required().messages({
        'number.base': 'Invalid User',
        'any.required': 'User is required'
    })
})

module.exports = { addEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema };
