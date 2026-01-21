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

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};
