const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

// Parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/categories");
});


// Use category routes
app.use("/", categoryRoutes);

app.use("/", itemRoutes);

// Set view engine
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
