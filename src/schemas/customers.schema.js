import joi from "joi";

export const customersSchema = joi.object(
    {
        name: joi.string().required().invalid(null),
        phone: joi.string().min(10).max(11),
        cpf: joi.string().length(11).required().invalid(null)
    });