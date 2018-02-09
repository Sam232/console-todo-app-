const MongoClient = require("mongodb").MongoClient;

var addTodo = (newTodo, callback) => {
  MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if(err){
      return callback(undefined, "Unable to connect to the mongodb local database server "+ err);
    }

    var db = client.db("console-todo-app");

    db.collection("todos").find({name: newTodo.name}).count().then((result) => {
      if(result !== 0){
        return callback(undefined, false);
      }

      db.collection("todos").insert({
        name: newTodo.name,
        description: newTodo.description
      }, (err, result) => {
        if(err){
          return callback(undefined, "Unable to add new todo to the database, "+err);
        }

        callback(true, undefined);
      });

    })
    .catch((err) => {
      callback(undefined, err);
    });


  });

}

module.exports.add = addTodo;
