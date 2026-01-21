/* 
Handles:

list → show all categories (GET /categories)

detail → show single category (GET /categories/:id)

newForm → display form to create category (GET /categories/new)

create → save new category (POST /categories)

editForm → display form to edit category (GET /categories/:id/edit)

update → update category (POST /categories/:id)

delete → remove category (POST /categories/:id/delete)
*/

const db = require("../db/queries");

// GET /categories → list all categories
async function list(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", { title: "All Categories", categories });
}

// GET /categories/:id → show single category
async function detail(req, res) {
  const id = req.params.id;
  const category = await db.getCategoryById(id);
  if (!category) return res.send("Category not found");
  res.render("category", { title: category.name, category });
}

// GET /categories/new → show form
async function newForm(req, res) {
  res.render("categoryForm", { title: "Create Category", category: {} });
}

// POST /categories → create new category
async function create(req, res) {
  const { name, description } = req.body;
  await db.insertCategory(name, description);
  res.redirect("/categories");
}

// GET /categories/:id/edit → show form pre-filled
async function editForm(req, res) {
  const id = req.params.id;
  const category = await db.getCategoryById(id);
  if (!category) return res.send("Category not found");
  res.render("categoryForm", { title: "Edit Category", category });
}

// POST /categories/:id → update category
async function update(req, res) {
  const id = req.params.id;
  const { name, description } = req.body;
  await db.updateCategory(id, name, description);
  res.redirect("/categories");
}

// POST /categories/:id/delete → delete category
async function remove(req, res) {
  const id = req.params.id;
  await db.deleteCategory(id);
  res.redirect("/categories");
}

module.exports = {
  list,
  detail,
  newForm,
  create,
  editForm,
  update,
  remove,
};
