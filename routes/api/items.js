const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.json({ success: false, message: err.message }));
});

// @route POST api/items/
// @desc Create a new Item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.json({ success: false, message: err.message }));
});

// @route PUT api/items/
// @desc Update an Item
// @access Public
router.put("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item
        .update({ $set: { name: req.body.name } })
        .then(item => res.json({ success: true, item }))
    )
    .catch(err =>
      res.status(404).json({ success: false, message: err.message })
    );
});

// @route DELETE api/items/:id
// @desc Delete an Item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item
        .remove()
        .then(() =>
          res.json({ success: true, message: "delete was successfull" })
        )
    )
    .catch(err =>
      res.status(404).json({ success: false, message: err.message })
    );
});

module.exports = router;
