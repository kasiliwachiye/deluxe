const Joi = require("joi");
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  makeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Make",
    required: true,
  },
  bodyTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BodyType",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    required: true,
    enum: ["in stock", "available on pre-order", "out of stock"],
  },
});

const Model = mongoose.model("Model", modelSchema);

const modelValidationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  makeId: Joi.string().hex().length(24).required(),
  bodyTypeId: Joi.string().hex().length(24).required(),
  price: Joi.number().min(1).max(100000000).required(),
  availability: Joi.string()
    .valid("in stock", "available on pre-order", "out of stock")
    .required(),
});

exports.Model = Model;
exports.ModelValidator = modelValidationSchema;
