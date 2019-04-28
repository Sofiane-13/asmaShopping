const Joi = require('joi-browser');

function validateReceipt(receipt) {
    const ingredientShema = Joi.object({
        _id: Joi.string().allow('').optional(),
        title: Joi.string().min(2).max(255).required(),
        quantity: Joi.number().min(0).max(5000),
        unity: Joi.string(),
        idIngredient: Joi.string().min(2).max(255).required(),
    });
    const genreShema = Joi.object({
        _id: Joi.string().allow('').optional(),
        title: Joi.string().min(2).max(255).required(),
        genreId: Joi.string().min(2).max(255).required(),

    });
    const schema = {
        _id: Joi.string().allow('').optional(),
        title: Joi.string().min(2).max(255).required(),
        preparation: Joi.string().min(0).max(2000).required(),
        cookingTime: Joi.number().min(0).max(255),
        personNum: Joi.number().min(0).max(500),
        liked: Joi.boolean(),
        genre: genreShema,
        ingredients: Joi.array().items(ingredientShema)
    };
    return Joi.validate(receipt, schema);
}

exports.validate = validateReceipt;