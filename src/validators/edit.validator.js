import Joi from "joi";

const editValidator = Joi.object({
    id: Joi.number(),
    status: Joi.string().required(),
    name: Joi.string().regex(/^[a-zA-ZА-Яа-яёЁґҐєЄіїІЇ ]{1,20}$/).required().messages({
        'string.pattern.base': 'Letters only min 1 max 20 symbols'
    }),
    surname: Joi.string().regex(/^[a-zA-ZА-Яа-яёЁґҐєЄіїІЇ ]{1,20}$/).required().messages({
        'string.pattern.base': 'Letters only min 1 max 20 symbols'
    }),
    email: Joi.string().email({tlds: {allow: false}}).required().messages({
        'string.pattern.base': 'wrong data'
    }),
    phone: Joi.string().regex(/^380\d+$/).required().messages({
        'string.pattern.base': 'wrong data'
    }),
    sum: Joi.number().min(0).max(50000).required().messages({
        'string.pattern.base': 'wrong data'
    }),
    alreadyPaid: Joi.number().min(0).max(50000).required().messages({
        'string.pattern.base': 'wrong data'
    }),
    course: Joi.string().required().messages({
        'string.pattern.base': 'wrong data'
    }),
    courseType: Joi.string().required().messages({
        'string.pattern.base': 'wrong data'
    }),
    courseFormat: Joi.string().required().messages({
        'string.pattern.base': 'wrong data'
    }),
    age: Joi.number().min(16).max(100).required().messages({
        'string.pattern.base': 'wrong data'
    }),
    group: Joi.string().required()
})

export {editValidator};