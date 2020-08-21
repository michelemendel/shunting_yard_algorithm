const calculator = require("./calculator");

const expr1 = "1-2*3";
const expr2 = "(7-4)^4*3";
const expr3 = "1+1-(2*3)";
const expr4 = "1+1-(2*(32+1))";

const result = calculator.run(expr4);

console.log("RESULT:", result);
