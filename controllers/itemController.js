/* 
Handles:

list → show all items (GET /items)

detail → show single item (GET /items/:id)

newForm → display form to create item (GET /items/new)

create → save new item (POST /items)

editForm → display form to edit item (GET /items/:id/edit)

update → update item (POST /items/:id)

delete → remove item (POST /items/:id/delete)

*/


const db = require("../db/queries");

// LIST all items
async function list(req, res) {
  const items = await db.getAllItems();
  res.render("items", { title: "All Items", items });
}

// SHOW form for creating new item
async function newForm(req, res) {
  const categories = await db.getAllCategories(); // fetch categories
  res.render("itemForm", { title: "Create Item", item: {}, categories });
}

// CREATE new item
async function create(req, res) {
  const { name, brand, category_id, shade, finish, price, stock, description } = req.body;
  await db.insertItem(name, brand, category_id, shade, finish, price, stock, description);
  res.redirect("/categories/" + category_id + "/items"); // redirect to the category page
}

// SHOW edit form
async function editForm(req, res) {
  const id = req.params.id;
  const item = await db.getItemById(id);
  if (!item) return res.send("Item not found");
  const categories = await db.getAllCategories();
  res.render("itemForm", { title: "Edit Item", item, categories });
}


// UPDATE item
async function update(req, res) {
  const id = req.params.id;
  const { name, brand, category_id, shade, finish, price, stock, description } = req.body;
  await db.updateItem(id, name, brand, category_id, shade, finish, price, stock, description);
  res.redirect("/categories/" + category_id + "/items");
}


// DELETE item
async function remove(req, res) {
  const id = req.params.id;
  await db.deleteItem(id);
  res.redirect("/items");
}

// SHOW single item
async function detail(req, res) {
  const id = req.params.id;
  const item = await db.getItemById(id);
  if (!item) return res.send("Item not found");
  res.render("item", { title: item.name, item });
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
