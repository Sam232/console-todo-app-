const yargs = require("yargs");
const addTodo = require("./database/addTodo");
const readTodo = require("./database/readTodo");
const deleteTodo = require("./database/deleteTodo");
const updateTodo = require("./database/updateTodo");

var argv = yargs.command("add", "Add A New Todo", {
  name: {
    description: "Todo Name",
    alias: "n",
    demand: true,
    string: true
  },
  description: {
    description: "Todo Description",
    alias: "d",
    demand: true,
    string: true
  }
})
.command("read-one", "Fetch A Single Todo From The DB", {
  name: {
    description: "Todo Name",
    alias: "n",
    demand: true,
    string: true
  }
})
.command("read-all", "Fetch All Todos From The DB")
.command("update", "Update An Already Existing Todo", {
  name: {
    description: "Todo Name",
    alias: "n",
    demand: true,
    string: true
  },
  newName: {
    description: "New Name For The Todo",
    alias: "nn",
    demand: true,
    string: true
  },
  newDescription: {
    description: "New Description For The Todo",
    alias: "nd",
    demand: true,
    string: true
  }
})
.command("delete-one", "Delete A Todo", {
  name: {
    description: "Todo Name",
    demand: true,
    alias: "n",
    string: true
  }
})
.command("delete-all", "Delete All Your Todos")
.help()
.argv;

if(argv._[0] === "add"){
  var newTodo = {
    name: argv.name,
    description: argv.description
  }

  addTodo.add(newTodo, (result, err) => {
    if(result === true){
      return console.log(newTodo.name.toUpperCase(),"Has Been Added To Your Todo List.");
    }
    else if(err === false){
      return console.log(newTodo.name.toUpperCase(),"Already Exist Within Your Todo List.");
    }
    console.log(err);
  });

}
else if(argv._[0] === "read-one"){
  var todoName = argv.name;

  readTodo.read(todoName, "read-one", (result, err) => {
    if(result.length >= 1 ){
      return result.forEach((value, index) => {
        console.log("Todo", index);
        console.log("Name:",value.name);
        console.log("Description:",value.description);
      });
    }
    console.log(err);
  });

}
else if(argv._[0] === "read-all"){
  readTodo.read("", "read-all", (result, err) => {
    if(result.length >= 1){
      return result.forEach((value, index) => {
        console.log("Todo", index);
        console.log("Name:", value.name);
        console.log("Description:", value.description);
        console.log("\n");
      });
    }
    console.log(err);
  });
}
else if(argv._[0] === "delete-one"){
  var todoName = argv.name;
  deleteTodo.delete(todoName, "delete-one", (result, err) => {
    if(result.length === 1){
      return result.forEach((value, index) => {
        console.log("--- Below Todo Has Been Delete ---");
        console.log("Name:", value.value.name);
        console.log("Description:", value.value.description);
      });
    }
    console.log(err);
  });
}
else if(argv._[0] === "delete-all"){
  deleteTodo.delete("", "delete-all", (result, err) => {
    if(result === true){
      return console.log("All Your Todos Have Been Successfully Deleted.");
    }
    console.log(err);
  });
}
else if(argv._[0] === "update"){
  var todoName = argv.name;
  var newTodo = {
    name: argv.newName,
    description: argv.newDescription
  }
  updateTodo.update(todoName, newTodo, (result, err) => {
    if(result.length === 1){
      return result.forEach((value, index) => {
        console.log("--- Below Is The New Todo Content ---");
        console.log("Name:", value.value.name);
        console.log("Description:", value.value.description);
      });
    }
    console.log(err);
  });
}
