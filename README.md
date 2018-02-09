# console-todo-app-
A app for creating todo(s) in the console.

This is a todo app that can be run from the console. This app was built with node.js and mongodb was used for creating the database. 
To run this app the following has to be done:
1. Ensure that you have node.js and mongodb installed on your computer.
2. Navigate to the root of the directory and enter the command npm install, to install all the dependencies for the app.
3. Ensure that you are using the default port number provided by mongodb, that is 27017.

This app uses yargs for receiving parameters passed to the it. To CRUD, enter the following commands:
1. node app.js add --name "Todo Name" --description "Todo Description" //Adding new todo
2. node app.js read-one "Todo Name" //Reading a single todo
3. node app.js read-all //Reading all todos
4. node app.js delete-one "Todo Name" //Deleting a single todo
5. node app.js delete-all //Deleting all todos
6. node app.js update --name "Todo Name" --newName "New Todo Name" --newDescription "New Todo Description" //Updating an already existing todo

The app was also tested using mocha and uses the expect third party module for applying assertions on received results.
