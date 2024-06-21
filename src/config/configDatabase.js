const mongoose = require('mongoose');
require('../models/User');
require('../models/Stone');

async function configDatabase() {
    const connectionsString = 'mongodb://localhost:27017/earth-treasure'

    mongoose.connect(connectionsString);

    console.log('Database connected');
}

module.exports = { configDatabase };