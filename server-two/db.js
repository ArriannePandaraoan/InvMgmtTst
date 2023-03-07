const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-1.clvgszsqmsfv.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "crops",
});

module.exports = connection;
