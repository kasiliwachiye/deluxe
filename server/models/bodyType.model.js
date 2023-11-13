const Joi = require("joi");
const mongoose = require("mongoose");

const bodyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
});

const BodyType = mongoose.model("Body-Type", bodyTypeSchema);

const bodyTypeValidationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
});

exports.BodyType = BodyType;
exports.BodyTypeValidator = bodyTypeValidationSchema;
