const dotnev = require('dotenv');
const path = require('path');

dotnev.config({ path: path.join(process.cwd(), '../.env') });

module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/sep-2020',
    PORT: 5000,

    MYSQL_USER: process.env.MYSQL_USER || 'user',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '12345',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'home',
    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost'
};
