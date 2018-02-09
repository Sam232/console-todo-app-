const expect = require("expect");
const addTodo = require("../database/addTodo");

describe("First Test", () => {
  it("Add Todo", (done) => {
    addTodo.add({
      name: "App",
      description: "Build A Todo App"
    }, (result, err) => {
      expect(result).toBeA("boolean");
      done();
    });
  });
});
