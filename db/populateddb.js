// db/populateDb.js

const pool = require("./pool");

async function populate() {
  try {
    // --------------------------
    // 1. Clear existing data
    // --------------------------
    await pool.query("DELETE FROM item");
    await pool.query("DELETE FROM category");

    console.log("Cleared previous data.");

    // --------------------------
    // 2. Insert categories
    // --------------------------
    const categories = [
      { name: "Lips", description: "Lipsticks, glosses, liners" },
      { name: "Eyes", description: "Eyeshadows, liners, mascaras" },
      { name: "Face", description: "Foundations, powders, primers" },
    ];

    const categoryIds = [];

    for (const cat of categories) {
      const result = await pool.query(
        "INSERT INTO category (name, description) VALUES ($1, $2) RETURNING id",
        [cat.name, cat.description]
      );
      categoryIds.push(result.rows[0].id);
    }

    console.log("Inserted categories:", categoryIds);

    // --------------------------
    // 3. Insert items
    // --------------------------
    const items = [
      // Lips
      {
        name: "Fenty Gloss Bomb",
        brand: "Fenty",
        category_id: categoryIds[0],
        shade: "Hot Chocolit",
        finish: "Glossy",
        price: 19.99,
        stock: 50,
        description: "Rich color and shiny finish",
      },
      {
        name: "MAC Ruby Woo",
        brand: "MAC",
        category_id: categoryIds[0],
        shade: "Ruby",
        finish: "Matte",
        price: 22.99,
        stock: 35,
        description: "Iconic red matte lipstick",
      },

      // Eyes
      {
        name: "Urban Decay Naked Palette",
        brand: "Urban Decay",
        category_id: categoryIds[1],
        shade: "N/A",
        finish: "Shimmer & Matte",
        price: 54.99,
        stock: 20,
        description: "12 neutral shades",
      },

      // Face
      {
        name: "Maybelline Fit Me Foundation",
        brand: "Maybelline",
        category_id: categoryIds[2],
        shade: "220 Natural Beige",
        finish: "Matte",
        price: 14.99,
        stock: 40,
        description: "Smooth, natural coverage",
      },
    ];

    for (const item of items) {
      await pool.query(
        `INSERT INTO item
          (name, brand, category_id, shade, finish, price, stock, description)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          item.name,
          item.brand,
          item.category_id,
          item.shade,
          item.finish,
          item.price,
          item.stock,
          item.description,
        ]
      );
    }

    console.log("Inserted items.");

    process.exit(0); // exit script
  } catch (err) {
    console.error("Error populating database:", err);
    process.exit(1);
  }
}

populate();
