// Harmadik féltől származó modulok (third-party modules) - npm. Telepíteni kell őket.
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// Common Core modulok. CommonJS tartja karban őket. Nem kell őket telepíteni.
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// Segédfüggvény
const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(
            path.join(__dirname, '..', 'logs', logFileName),
            logItem
        );
    } catch (error) {
        console.log(error.message);
    }
};

// Saját (common) middleware.
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logEvents, logger };
