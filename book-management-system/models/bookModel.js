const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

function readBooks() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

function writeBooks(books) {
    fs.writeFileSync(DB_PATH, JSON.stringify(books, null, 2), 'utf-8');
}

module.exports = { readBooks, writeBooks };
