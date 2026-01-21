// handles all item/product routes

const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// LIST all items
router.get("/items", itemController.list);

// SHOW create form
router.get("/items/new", itemController.newForm);

// CREATE item
router.post("/items", itemController.create);

// EDIT form
router.get("/items/:id/edit", itemController.editForm);

// UPDATE item
router.post("/items/:id", itemController.update);

// DELETE item
router.post("/items/:id/delete", itemController.remove);

// SHOW single item
router.get("/items/:id", itemController.detail);

module.exports = router;
