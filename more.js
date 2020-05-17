// scripts
$(document).ready(function() {
    $(".devour-form").on("submit", function(event) {
      event.preventDefault();
      var burger_id = $(this).children(".burger_id").val();
      console.log(burger_id);
      $.ajax({
        method: "PUT",
        url: "/burgers/" + burger_id
      }).then(function(data) {
        // reload page to display devoured burger in proper column
        location.reload();
      });
    });
  });

  // orm
  // Here is the O.R.M. where you write functions that takes inputs and conditions
  // and turns them into database commands like SQL.
  var connection = require("./connection.js");
  function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  function objToSql(ob) {
    // column1=value, column2=value2,...
    var arr = [];
    for (var key in ob) {
      arr.push(key + "=" + ob[key]);
    }
    return arr.toString();
  }
  var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    // vals is an array of values that we want to save to cols
    // cols are the columns we want to insert the values into
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
      console.log(queryString);
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    // objColVals would be the columns and values that you want to update
    // an example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    }
  };
  module.exports = orm;
  
  //controller
//   router.put("/burgers/:id", function(req, res) {
//       burger.update(req.params.id, function(result) {
//           // wrapper for orm.js that using MySQL update callback will return a log to console,
//           // render back to index with handle
//           console.log(result);
//           // Send back response and let page reload from .then in Ajax
//           res.sendStatus(200);
//       });
//   });