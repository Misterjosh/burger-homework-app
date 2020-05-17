var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    //hint:orm.all()
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  create: function(burger_name, devoured, cb) {
    //hint:orm.create()
    orm.create("burgers", burger_name, devoured, function(res) {
      cb(res);
    });
  },
  update: function(id, cb) {
    var condition = "id=" + id;
    //hint:orm.update()
    orm.update("burgers", {devoured: true}, condition, function(res) {
      cb(res);
    });
  }
};

module.exports = burger;
