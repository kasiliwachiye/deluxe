const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const { Model, ModelValidator } = require("../models/model.model");
const { Make } = require("../models/make.model");

// Get all models
router.get("/", async (req, res) => {
  const models = await Model.find().sort("name");
  res.send(models);
});

// Get a specific model by ID
router.get("/:id", async (req, res) => {
  // find make by a certain id
  const model = await Model.findById(req.params.id);

  // return 404 error if it doesn't exist
  if (!model) {
    return res.status(404).send("The model with the given ID does not exist");
  }

  // return found object(model) to the client
  res.send(model);
});

// Create a new model
router.post("/", [auth, admin], async (req, res) => {
  // Validate object request, send 400(bad request) error if invalid
  const result = ModelValidator.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // See if model already exists
  let model = await Model.findOne({ name: req.body.name });
  if (model) {
    return res.status(400).send("Model already exists.");
  }

  const { name, makeId } = req.body;

  // Check if the specified make exists
  const make = await Make.findById(makeId);
  if (!make) {
    return res.status(404).send("The make with the given ID does not exist");
  }

  model = new Model({
    name,
    makeId: make._id,
  });

  await model.save();
  res.send(model);
});

// Update a model by ID
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = ModelValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const model = await Model.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!model) {
    return res.status(404).send("The model with the given ID does not exist");
  }

  res.send(model);
});

// Delete a model by ID
router.delete("/:id", [auth, admin], async (req, res) => {
  const model = await Model.findByIdAndDelete(req.params.id);

  if (!model) {
    return res.status(404).send("The model with the given ID does not exist");
  }

  res.send(`The model ${model.name} was deleted`);
});

module.exports = router;
