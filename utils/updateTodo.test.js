const expect = require("expect");
const updateTodo = require("../database/updateTodo");

describe("Fourth Test", () => {
  it("Update Todo", (done) => {
    updateTodo.update("App1", {
      name: "App",
      description: "An App To Enable Users To Communicate Easily With Eachother."
    }, (result, err) => {
      if(result.length === 1){
        expect(result).toBeA("array");
        done();
      }
      else{
        throw new Error(err);
        done();
      }
    });
  });
});
