const MongoClient = require("mongodb").MongoClient;

var updateTodo = (todoName, newTodo, callback) => {
  MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if(err){
      return console.log(err);
    }

    var db = client.db("console-todo-app");

    db.collection("todos").find({name: todoName}).count().then((result) => {
      if(result === 1){
        return db.collection("todos").findOneAndUpdate({name: todoName}, {
          "$set": {
            name: newTodo.name,
            description: newTodo.description
          }
        },
        {
          returnOriginal: false
        }
        ).then((result) => {
          var todoUpdate = [];
          todoUpdate[0] = result;
          callback(todoUpdate, undefined);
        })
        .catch((err) => {
          callback([], err)
        })
      }
      
      callback([], "Todo Does Not Exist");
    })
    .catch((err) => {
      callback([], "Unable To Fetch And Uodate The Todo,",err);
    });

  });
}

module.exports.update = updateTodo;
