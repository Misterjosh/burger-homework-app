var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  //hint: burger.all
  burger.all((burgerData) => {
    res.render("index", {burger_data: burgerData});
  });
});

// post route -> back to index
  //hint: burger.create
router.post("/burgers/create", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, 0
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

// put route -> back to index
  //hint: burger.update()
  router.put("/burgers/:id", function(req, res) {
    burger.update(req.params.id, function(result) {
        // wrapper for orm.js that using MySQL update callback will return a log to console,
        // render back to index with handle
        console.log(result);
        // Send back response and let page reload from .then in Ajax
        res.sendStatus(200);
    });
});

module.exports = router;
