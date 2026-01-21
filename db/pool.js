const { Pool } = require("pg");


/*
// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: "postgresql://learning:changeme@localhost:5432/makeup_inventory"
}); 

*/


//const { Pool } = require("pg");

module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});


