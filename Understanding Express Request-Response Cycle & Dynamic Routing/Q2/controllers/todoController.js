const { readTodos, writeTodos } = require("../models/todoModel");

const getTodos = (req, res) => {
  const todos = readTodos();
  if (req.query.search) {
    const keyword = req.query.search.toLowerCase();
    const result = todos.filter(todo =>
      todo.title.toLowerCase().includes(keyword)
    );
    return res.json(result);
  }
  res.json(todos);
};

const addTodo = (req, res) => {
  const todos = readTodos();
  const { title, completed } = req.body;
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: completed || false,
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const todos = readTodos();
  const id = Number(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return res.status(404).json({ msg: "Todo not found" });

  todos[index] = { ...todos[index], ...req.body };
  writeTodos(todos);
  res.json(todos[index]);
};

const deleteTodo = (req, res) => {
  const todos = readTodos();
  const id = Number(req.params.id);
  const filtered = todos.filter(todo => todo.id !== id);
  if (todos.length === filtered.length)
    return res.status(404).json({ msg: "Todo not found" });

  writeTodos(filtered);
  res.json({ msg: `Todo ${id} deleted` });
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
