const Joi = require("joi");
const mongoose = require("mongoose");

// 2. define make schema
const makeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true,
  },
});

// 3. create make model and collection
const Make = mongoose.model("Make", makeSchema);

// joi validation schema => to validate client input
const makeValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports.Make = Make;
module.exports.MakeValidator = makeValidationSchema;
