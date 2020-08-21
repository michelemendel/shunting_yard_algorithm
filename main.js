const calculator = require("./calculator");

const expr1 = "1-2*3";
const expr2 = "(7-4)^4*3";
const expr3 = "1+1-(2*3)";
const expr4 = "1+1-(2*(32+1))";

const result = calculator.run(expr4);

console.log("RESULT:", result);

// Using the AWS Lambda function

// 1-2*3
// https://ntkvwx3idb.execute-api.eu-west-2.amazonaws.com/fn?fn=calculator&input=1-2%2A3

// (7-4)^4*3
// https://ntkvwx3idb.execute-api.eu-west-2.amazonaws.com/fn?fn=calculator&input=%287-4%29%5E4%2A3

// 1+1-(2*3)
// https://ntkvwx3idb.execute-api.eu-west-2.amazonaws.com/fn?fn=calculator&input=1%2B1-%282%2A3%29

// 1+1-(2*(32+1))
// https://ntkvwx3idb.execute-api.eu-west-2.amazonaws.com/fn?fn=calculator&input=1%2B1-%282%2A%2832%2B1%29%29
