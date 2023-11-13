const { User, UserValidator } = require("../models/user.model");
const auth = require("../middleware/auth.middleware");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  // validate request object
  const { error } = UserValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // See if user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered.");
  }

  // Create a new user object
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  // Send the response without using lodash
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

module.exports = router;
