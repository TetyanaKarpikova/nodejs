// const db = require('../../dataBase');
//
// module.exports = {
//   findAll: async () => {
//     const [dbResponse] = await db.query('SELECT * FROM client');
//
//     return dbResponse;
//   },
//
//   postClient: (filterObject) => {
//     const { FirstName, LastName, Education, Passport, City, Age, Department_idDepartment } = filterObject;
//
//     return db.query(`INSERT INTO client (FirstName, LastName, Education, Passport, City, Age, Department_idDepartment )
//         VALUES ('${FirstName}', '${LastName}', '${Education}', '${Passport}', '${City}', '${Age}',
//         '${Department_idDepartment}')`);
//   }
// };

const db = require('../dataBase').getInstance();

const { modelNameEnum } = require('../constant');

module.exports = {
    findAll: () => {
        const Client = db.getModel(modelNameEnum.Client);

        return Client.findAll();
    },

    postClient: (clientObject) => {
        const Client = db.getModel(modelNameEnum.Client);

        return Client.create(clientObject);
    },

    findOneClient: async (id) => {
        const Client = db.getModel(modelNameEnum.Client);

        const singleClient = await Client.findOne({
            where: {
                idClient: id
            }
        });

        return singleClient;
    },

    deleteOneClient: async (id) => {
        const Client = db.getModel(modelNameEnum.Client);

        const delClient = await Client.destroy({
            where: {
                idClient: id
            }
        });

        return delClient;
    }
};
