const express = require('express');
const { configDatabase } = require('./config/configDatabase');
const { configExpress } = require('./config/configExpress');
const { configRoutes } = require('./config/configRoutes');
const { configHbs } = require('./config/configHbs');
const { register, login } = require('./services/userService');
const { createToken, verifyToken } = require('./services/jwtService');

start();

async function start() {
    const app = express();

    await configDatabase();
    configExpress(app);
    configHbs(app);
    configRoutes(app);
    app.listen(3000, () => {
        console.log('Server started http://localhost:3000');
    });
}