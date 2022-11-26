import Joi from 'joi';

const create: any = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

export default { create };
