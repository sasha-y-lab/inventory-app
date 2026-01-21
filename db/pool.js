const { Pool } = require("pg");



// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: "postgresql://learning:changeme@localhost:5432/makeup_inventory"
});

