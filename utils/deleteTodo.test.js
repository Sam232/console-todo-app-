const expect = require("expect");
const deleteTodo = require("../database/deleteTodo");

describe("Second Test", () => {
  it("Delete Todo", (done) => {
    deleteTodo.delete("App", "delete-one", (result, err) => {
      expect(result).toBeA("array");
      console.log(result)
      done();
    });
  });
});
