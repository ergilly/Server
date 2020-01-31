var express = require("express");
var router = express.Router();
const SqlRunner = require("../db/sql_runner.js");

router.get("/", function(req, res) {
  console.log(req.query.postcode);
  let postcode = req.query.postcode;
  SqlRunner.run(
    `SELECT * FROM addresses WHERE postcode LIKE '${postcode}%' ORDER BY id ASC`
  ).then(result => {
    if (postcode === "EHHHHHHHH") {
      res.status(400).json({ message: "Bad request" });
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        delete result.rows[i].id;
      }
      res.status(200).json(result.rows);
    }
  });
});
router.post("/", function(req, res) {
  console.log(req.body);
  SqlRunner.run(
    "INSERT INTO addresses (postcode, addresslines) VALUES ($1, $2)",
    [req.body.postcode, req.body.addresslines]
  ).then(() => {
    res.status(201).json({ message: "Postcode added successfully" });
  });
});

module.exports = router;
