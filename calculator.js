const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
const div = (a, b) => a / b;
const pow = (a, b) => Math.pow(a, b);
const noOp = () => true;

const ops = {
  "+": ["ADD", add, 1],
  "-": ["SUB", sub, 1],
  "*": ["MULT", mult, 2],
  "/": ["DIV", div, 2],
  "^": ["POW", pow, 3],
  "(": ["LEFT_PAREN", noOp, 0],
  ")": ["RIGHT_PAREN", noOp, 0],
};

const stack = () => {
  const s = [];
  return {
    push: (a) => s.push(a),
    pop: () => s.pop(),
    peek: () => s[s.length - 1],
    get: () => s,
  };
};

const queue = () => {
  const q = [];
  return {
    enq: (a) => q.push(a),
    deq: () => q.shift(),
    peek: () => q[0],
    get: () => q,
  };
};

const isOp = (x) => x in ops;

const flushToLeftParen = (stack, queue) => {
  while (stack.peek()[0] !== "LEFT_PAREN") {
    queue.enq(stack.pop());
  }
  stack.pop();
};

const flushStackToQueue = (stack, queue) => {
  while (stack.peek()) {
    queue.enq(stack.pop());
  }
};

// This is the heart of the shuntyard algorithm
const shuntyard = (x, stack, queue) => {
  const prec = stack.peek() ? stack.peek()[2] : 0;

  if (x === "(") {
    stack.push(ops[x]);
  } else if (x === ")") {
    flushToLeftParen(stack, queue);
  } else if (isOp(x) && ops[x][2] >= prec) {
    stack.push(ops[x]);
  } else if (isOp(x) && ops[x][2] < prec) {
    queue.enq(stack.pop());
    stack.push(ops[x]);
  } else {
    queue.enq(x);
  }
};

const tokenize = (expr) => {
  const regex = /(\d+(?:\.\d+)?)|([().^*\/+-])/g;
  const matches = expr.matchAll(regex);
  return Array.from(matches).map((m) => m[0]);
};

const parse = (expr) => {
  const s = stack();
  const q = queue();

  for (t of expr) {
    shuntyard(t, s, q);
  }

  flushStackToQueue(s, q);

  return {
    stack: s,
    queue: q,
  };
};

const calculate = (expr) => {
  const s = stack();

  console.log("EXPR\n", expr.get());

  while (expr.peek()) {
    if (typeof expr.peek()[1] === "function") {
      const a = Number(s.pop());
      const b = Number(s.pop());
      s.push(expr.deq()[1](b, a));
    } else {
      s.push(expr.deq());
    }
  }

  return s.get()[0];
};

const run = (expr) => {
  const tokenized = tokenize(expr);
  const parsed = parse(tokenized);
  const result = calculate(parsed.queue);

  // console.log("TOKENIZED\n", tokenized);
  // console.log("STACK\n", parsed.stack.get());
  // console.log("QUEUE\n", parsed.queue.get());

  return result;
};

module.exports.run = run;
