const MongoClient = require("mongodb").MongoClient;

var readTodo = (todoName, command, callback) => {
  MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if(err){
      return "Unable to connect the mongodb local database server, "+ err;
    }

    var db = client.db("console-todo-app");

    if(command === "read-one"){
      return db.collection("todos").find({name: todoName}).count().then((result) => {
        if(result === 1){
          return db.collection("todos").find({name: todoName}).toArray().then((result) => {
            callback(result, undefined);
          })
          .catch((err) => {
            callback([], err);
          });
        }

        callback([], "Todo Does Not Exist");
      })
      .catch((err) => {
        callback([], err);
      });
    }

    db.collection("todos").find().count().then((result) => {
      if(result >= 1){
        return db.collection("todos").find().toArray().then((result) => {
          callback(result, undefined);
        })
        .catch((err) => {
          callback([], err);
        });
      }

      callback([], "No Added Todo(s).");
    })
    .catch((err) => {
      callback([], err);
    });

  });

}

module.exports.read = readTodo;
