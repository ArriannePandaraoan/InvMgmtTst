const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// eslint-disable-next-line no-unused-vars
const connection = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/crops", (req, res) => {
  const CROPS_QUERY = "SELECT * FROM crops";
  connection.query(CROPS_QUERY, (err, response) => {
    res.send(response);
  });
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/crops/:id", (req, res) => {
  const CROPS_IND_QUERY = `SELECT * FROM crops WHERE (id=${req.params.id})`;
  connection.query(CROPS_IND_QUERY, (err, response) => {
    res.send(response);
  });
});

app.post("/add-crop", (req, res) => {
  const ADD_QUERY = `INSERT INTO crops (name, description, quantity, price, remark) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.quantity}', '${req.body.price}', '${req.body.remark}' )`;
  connection.query(ADD_QUERY, (err) => {
    if (err) console.log(err);
  });
});

app.delete("/delete-crop/:id", (req, res) => {
  const DELETE_QUERY = `DELETE FROM crops WHERE (id=${req.params.id})`;
  connection.query(DELETE_QUERY, (err) => {
    if (err) console.log(err);
  });
});

app.put("/update-crop/:id", (req, res) => {
  const UPDATE_QUERY = `UPDATE crops SET name='${req.body.name}', description='${req.body.description}', quantity='${req.body.quantity}', price='${req.body.price}', remark='${req.body.remark}' WHERE id='${req.params.id}'`;
  connection.query(UPDATE_QUERY, (err) => {
    if (err) console.log(err);
  });
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
