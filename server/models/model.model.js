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
});

const Model = mongoose.model("Model", modelSchema);

const modelValidationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  makeId: Joi.string().hex().length(24),
});

exports.Model = Model;
exports.ModelValidator = modelValidationSchema;
