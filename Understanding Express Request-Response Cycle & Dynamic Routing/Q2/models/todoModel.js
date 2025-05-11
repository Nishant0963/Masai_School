const fs = require("fs");
const path = "./db.json";

const readTodos = () => {
  const data = fs.readFileSync(path);
  return JSON.parse(data).todos;
};

const writeTodos = (todos) => {
  fs.writeFileSync(path, JSON.stringify({ todos }, null, 2));
};

module.exports = { readTodos, writeTodos };
