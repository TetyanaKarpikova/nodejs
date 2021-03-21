/* eslint-disable quote-props */

const { MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER, MYSQL_HOST } = require('./config');

module.exports = {
    development: {
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        host: MYSQL_HOST,
        dialect: 'mysql'
    }
};
