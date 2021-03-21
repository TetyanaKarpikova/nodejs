// const mysql2 = require('mysql2');

// const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST } = require('../config/config');

// const connection = mysql2.createConnection({
//     user: MYSQL_USER,
//     password: MYSQL_PASSWORD,
//     database: MYSQL_DATABASE,
//     host: MYSQL_HOST
// });

// module.exports = connection.promise();

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST } = require('../config/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize(MYSQL_DATABASE,
            MYSQL_USER,
            MYSQL_PASSWORD,
            {
                host: MYSQL_HOST,
                dialect: 'mysql'
            });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');

                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));

                    models[model] = modelFile(client);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            transactionInstance: () => client.transaction()
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance;
        }
    };
})();
