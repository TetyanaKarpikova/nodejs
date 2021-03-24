const cron = require('node-cron');

const delToken = require('./delToken');

module.exports = () => {
    cron.schedule('* 3 1 * *', () => {
        console.log(`${new Date().toISOString()} : started cron-jobs`);
        delToken();
        console.log(`${new Date().toISOString()} : finished cron-jobs`);
    });
};
