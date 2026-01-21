const pool = require("./pool");

// Get all categories
async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM category ORDER BY id");
  return rows;
}

// Get one category by id
async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM category WHERE id=$1", [id]);
  return rows[0];
}

// Insert new category
async function insertCategory(name, description) {
  await pool.query(
    "INSERT INTO category (name, description) VALUES ($1, $2)",
    [name, description]
  );
}

// Update category
async function updateCategory(id, name, description) {
  await pool.query(
    "UPDATE category SET name=$1, description=$2 WHERE id=$3",
    [name, description, id]
  );
}

// Delete category
async function deleteCategory(id) {
  await pool.query("DELETE FROM category WHERE id=$1", [id]);
}


async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM item");
  return rows;
}

// Get one item by ID
async function getItemById(id) {
  const { rows } = await pool.query("SELECT * FROM item WHERE id = $1", [id]);
  return rows[0];
}

async function insertItem(name, brand, category_id, shade, finish, price, stock, description) {
  await pool.query(
    `INSERT INTO item (name, brand, category_id, shade, finish, price, stock, description)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [name, brand, category_id, shade, finish, price, stock, description]
  );
}

async function updateItem(id, name, brand, category_id, shade, finish, price, stock, description) {
  await pool.query(
    `UPDATE item SET name=$1, brand=$2, category_id=$3, shade=$4, finish=$5, price=$6, stock=$7, description=$8
     WHERE id=$9`,
    [name, brand, category_id, shade, finish, price, stock, description, id]
  );
}


// Delete item
async function deleteItem(id) {
  await pool.query("DELETE FROM item WHERE id=$1", [id]);
}


// get all items for a specific category
async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM item WHERE category_id = $1",
    [categoryId]
  );
  return rows;
}

module.exports = {
  getAllItems,
  getItemById,
  insertItem,
  updateItem,
  deleteItem,
  getItemsByCategoryId,
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};

