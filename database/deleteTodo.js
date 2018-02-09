const MongoClient = require("mongodb").MongoClient;

var deleteTodo = (todoName, command, callback) => {
  MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if(err){
      return err;
    }

    var db = client.db("console-todo-app");

    if(command === "delete-one"){
      return db.collection("todos").findOneAndDelete({name: todoName}).then((todo) => {
        if(todo.value){
          var result = [];
          result[0] = todo;

          return callback(result, undefined);
        }
        callback([], "Todo Does Not Exist");
      })
      .catch((err) => {
        callback([], err);
      });
    }

    db.collection("todos").deleteMany().then((result) => {
      if(result.deletedCount >= 1){
        return callback(true, undefined);
      }
      callback(undefined, "No Todo(s) Exist.");
    })
    .catch((err) => {
      callback(undefined, err)
    });
  });
}

module.exports.delete = deleteTodo;
