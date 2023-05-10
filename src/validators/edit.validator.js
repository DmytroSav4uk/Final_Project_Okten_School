import Joi from "joi";

const editValidator = Joi.object({
    id: Joi.number(),
    status: Joi.string().required(),
    name: Joi.string().regex(/^[a-zA-ZА-Яа-яёЁґҐєЄіїІЇ ]{1,20}$/).messages({
        'string.pattern.base': 'Letters only min 1 max 20 symbols'
    }),
    surname: Joi.string().regex(/^[a-zA-ZА-Яа-яёЁґҐєЄіїІЇ ]{1,20}$/).messages({
        'string.pattern.base': 'Letters only min 1 max 20 symbols'
    }),
    email: Joi.string().email({tlds: {allow: false}}).messages({
        'string.pattern.base': 'wrong data'
    }),
    phone: Joi.string().regex(/^380\d+$/).messages({
        'string.pattern.base': 'wrong data'
    }),
    sum: Joi.number().max(50000).messages({
        'string.pattern.base': 'wrong data'
    }),
    alreadyPaid: Joi.number().max(50000).messages({
        'string.pattern.base': 'wrong data'
    }),
    course: Joi.string().messages({
        'string.pattern.base': 'wrong data'
    }),
    courseType: Joi.string().messages({
        'string.pattern.base': 'wrong data'
    }),
    courseFormat: Joi.string().messages({
        'string.pattern.base': 'wrong data'
    }),
    age: Joi.number().min(16).max(100).messages({
        'string.pattern.base': 'wrong data'
    }),
    group: Joi.string().required()
})

export {editValidator};