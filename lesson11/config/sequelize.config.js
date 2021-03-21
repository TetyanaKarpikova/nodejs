/* eslint-disable quote-props */

const { MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_USER,
    MYSQL_HOST,
    MYSQL_DIALECT } = require('./config');

module.exports = {
    development: {
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        host: MYSQL_HOST,
        dialect: MYSQL_DIALECT
    }
};
