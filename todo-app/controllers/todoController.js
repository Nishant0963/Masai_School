const { readTodos, writeTodos } = require('../models/todoModel');

let nextId = (() => {
    const todos = readTodos();
    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id || 0), 0);
    return maxId + 1;
})();

exports.getAllTodos = (req, res) => {
    const todos = readTodos();
    res.json(todos);
};

exports.createTodo = (req, res) => {
    const { title, completed } = req.body;
    if (!title || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Title and completed status are required.' });
    }

    const todos = readTodos();
    const newTodo = { id: nextId++, title, completed };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todos = readTodos();
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found.' });
    }

    if (title !== undefined) todos[index].title = title;
    if (completed !== undefined) todos[index].completed = completed;

    writeTodos(todos);
    res.json(todos[index]);
};

exports.deleteTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const todos = readTodos();
    const filteredTodos = todos.filter(t => t.id !== id);

    if (todos.length === filteredTodos.length) {
        return res.status(404).json({ error: 'Todo not found.' });
    }

    writeTodos(filteredTodos);
    res.json({ message: 'Todo deleted.' });
};

exports.searchTodos = (req, res) => {
    const query = req.query.q?.toLowerCase();
    if (!query) return res.status(400).json({ error: 'Search query is required.' });

    const todos = readTodos();
    const results = todos.filter(todo =>
        todo.title.toLowerCase().includes(query)
    );

    res.json(results);
};
