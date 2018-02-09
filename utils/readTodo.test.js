const objectID = require("mongodb").ObjectID;
const expect = require("expect");
const readTodo = require("../database/readTodo");

describe("Third Test", () => {
  it("Read Todo", (done) => {
    readTodo.read("App", "read-one", (result, err) => {
      expect(result).toBeA("array").toInclude({
        _id: new objectID("5a7d65e4c9331c045c7275dc"),
        name: "App",
        description: "Build A Todo App"
      });
      done();
    });
  });
});
