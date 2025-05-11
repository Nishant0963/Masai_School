const { readTickets, writeTickets } = require('../models/ticketModel');

let nextId = (() => {
    const tickets = readTickets();
    const maxId = tickets.reduce((max, t) => Math.max(max, t.id || 0), 0);
    return maxId + 1;
})();

exports.getAllTickets = (req, res) => {
    res.json(readTickets());
};

exports.getTicketById = (req, res) => {
    const id = parseInt(req.params.id);
    const ticket = readTickets().find(t => t.id === id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
};

exports.createTicket = (req, res) => {
    const { title, description, priority, user } = req.body;
    const newTicket = { id: nextId++, title, description, priority, user, status: 'pending' };
    const tickets = readTickets();
    tickets.push(newTicket);
    writeTickets(tickets);
    res.status(201).json(newTicket);
};

exports.updateTicket = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, priority } = req.body;
    const tickets = readTickets();
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (priority) ticket.priority = priority;

    writeTickets(tickets);
    res.json(ticket);
};

exports.deleteTicket = (req, res) => {
    const id = parseInt(req.params.id);
    const tickets = readTickets();
    const filtered = tickets.filter(t => t.id !== id);
    if (tickets.length === filtered.length) return res.status(404).json({ error: 'Ticket not found' });

    writeTickets(filtered);
    res.json({ message: 'Ticket deleted' });
};

exports.resolveTicket = (req, res) => {
    const id = parseInt(req.params.id);
    const tickets = readTickets();
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    ticket.status = 'resolved';
    writeTickets(tickets);
    res.json(ticket);
};
