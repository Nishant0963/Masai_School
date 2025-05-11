const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../logs/transaction.log');

function logTransaction(message) {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logPath, log);
}

module.exports = logTransaction;
