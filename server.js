const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = require("express");

const connect = require("connect");

const app = connect();
app.use(bodyParser.json());

//Establish the database connection

const db = mysql.createConnection({
  host: "database-1.clvgszsqmsfv.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "crops",
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

//Establish the Port

app.listen(8085, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  } else {
    console.log("Started....!!!! 8085");
  }
});

//Create the Records

server.post("/crops", (req, res) => {
  let details = {
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    remark: req.body.remark,
  };
  let sql = "INSERT INTO crops";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student created Failed" });
    } else {
      res.send({ status: true, message: "Student created successfully" });
    }
  });
});

//view the Records
app.get("/crops", (req, res) => {
  var sql = "SELECT * FROM crops";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records

app.get("/crops/:id", (req, res) => {
  var studentid = req.params.id;
  var sql = "SELECT * FROM crops id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Update the Records

app.put("/crops/:id", (req, res) => {
  let sql =
    "UPDATE crops SET name='" +
    req.body.name +
    "', course='" +
    req.body.course +
    "',fee='" +
    req.body.fee +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Updated Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

//Delete the Records

app.delete("/crops/:id", (req, res) => {
  let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});
