const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const { BodyType, BodyTypeValidator } = require("../models/bodyType.model");

// Get all body types
router.get("/", async (req, res) => {
  const bodyTypes = await BodyType.find().sort("name");
  res.send(bodyTypes);
});

// Get a specific body type by ID
router.get("/:id", async (req, res) => {
  const bodyType = await BodyType.findById(req.params.id);

  if (!bodyType) {
    return res
      .status(404)
      .send("The body type with the given ID does not exist");
  }

  res.send(bodyType);
});

// Create a new body type
router.post("/", [auth, admin], async (req, res) => {
  const result = BodyTypeValidator.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const { name } = req.body;

  // Check if the body type already exists
  let bodyType = await BodyType.findOne({ name });
  if (bodyType) {
    return res.status(400).send("Body type already exists.");
  }

  bodyType = new BodyType({ name });
  await bodyType.save();

  res.send(bodyType);
});

// Update a body type by ID
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = BodyTypeValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const bodyType = await BodyType.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!bodyType) {
    return res
      .status(404)
      .send("The body type with the given ID does not exist");
  }

  res.send(bodyType);
});

// Delete a body type by ID
router.delete("/:id", [auth, admin], async (req, res) => {
  const bodyType = await BodyType.findByIdAndDelete(req.params.id);

  if (!bodyType) {
    return res
      .status(404)
      .send("The body type with the given ID does not exist");
  }

  res.send(`The body type ${bodyType.name} was deleted`);
});

module.exports = router;
