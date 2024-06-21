const cookieParser = require('cookie-parser');
const express = require('express');
const { sessionMiddleware } = require('../middlewares/sessionMiddleware');

const secret = 'big time s3cr3t'
function configExpress(app) {

    app.use(cookieParser(secret));
    app.use(sessionMiddleware());
    // TODO add session middleware

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
};

module.exports = { configExpress };