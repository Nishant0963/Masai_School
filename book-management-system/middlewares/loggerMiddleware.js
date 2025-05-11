const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../logs/requests.log');

module.exports = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${req.method} ${req.originalUrl}\n`;
    fs.appendFileSync(logPath, log);
    next();
};
