const { Make, MakeValidator } = require("../models/make.model");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // find all vehicle makes
  const makes = await Make.find().sort("name");
  // return makes to client
  res.send(makes);
});

router.get("/:id", async (req, res) => {
  // find make by a certain id
  const make = await Make.findById(req.params.id);

  // return 404 error if it doesn't exist
  if (!make) {
    return res.status(404).send("The make with the given ID does not exist");
  }

  // return found object(make) to the client
  res.send(make);
});

router.post("/", [auth, admin], async (req, res) => {
  // Validate request object, if request object is invalid, return 400 (bad request) error
  const result = MakeValidator.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // See if make already exists
  let make = await Make.findOne({ name: req.body.name });
  if (make) {
    return res.status(400).send("Make already exists.");
  }

  // Create new make
  make = new Make({ name: req.body.name });
  await make.save();

  // Send back added make
  res.send(make);
});

router.put("/:id", [auth, admin], async (req, res) => {
  // Validate request object, if request object is invalid, return 400 (bad request) error
  const { error } = MakeValidator.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const make = await Make.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  // If make doesn't exist, return 404 error
  if (!make) {
    return res.status(404).send("The make with the given ID does not exist");
  }

  // Return updated make
  res.send(make);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const make = await Make.findByIdAndDelete(req.params.id);

  // If make doesn't exist, return 404 error
  if (!make) {
    return res.status(404).send("The make with the given ID does not exist");
  }

  // Return deleted make
  res.send(`The make ${make.name} was deleted`);
});

module.exports = router;
