const { createPool } = require("mysql");

const pool = createPool({
  host: "database-1.clvgszsqmsfv.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "crops",
});

pool.query(`SELECT * FROM crops`, (err, res) => {
  return console.log(res);
});
