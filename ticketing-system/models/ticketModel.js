const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

function readTickets() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

function writeTickets(tickets) {
    fs.writeFileSync(DB_PATH, JSON.stringify(tickets, null, 2), 'utf-8');
}

module.exports = { readTickets, writeTickets };
