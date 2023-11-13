const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// define schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

// create a a model & collection
const User = mongoose.model("User", userSchema);

// validation schema
const userValidationSchema = Joi.object({
  username: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(5).max(255).alphanum().required(),
  isAdmin: Joi.boolean(),
});

exports.User = User;
exports.UserValidator = userValidationSchema;
