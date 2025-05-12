import joi from "joi";

export const gamesSchema = joi.object(
    {
        name: joi.string().required().invalid(null),
        image: joi.string(),
        stockTotal: joi.number().positive().required().invalid(null),
        pricePerDay: joi.number().positive().required().invalid(null)
    });
