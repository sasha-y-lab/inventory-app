// handles all category routes


const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

const adminAuth = require("../middleware/adminAuth");


router.get("/categories/new", categoryController.newForm);   // must be before :id
router.post("/categories", categoryController.create);

router.get("/categories/:id/edit", categoryController.editForm);  // must be before :id
//router.post("/categories/:id", categoryController.update);

// Update category
router.post("/categories/:id", adminAuth, categoryController.update);

// Delete category
router.post("/categories/:id/delete", adminAuth, categoryController.remove);


//router.post("/categories/:id/delete", categoryController.remove);

router.get("/categories/:id", categoryController.detail);   // :id route last
router.get("/categories", categoryController.list);


// NEW: items in a category
router.get("/categories/:id/items", categoryController.itemsInCategory);



module.exports = router;





