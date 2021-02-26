const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const filePath = path.join(__dirname, '/../dataBase', 'users.json');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const errorMessages = require('../error/error.messages');

module.exports = {
    findUsers: async () => {
        const allUsers = await readFile(filePath);

        return JSON.parse(allUsers.toString());
    },

    findUserById: async (userId) => {
        const allUsers = await readFile(filePath);
        const jsonData = JSON.parse(allUsers.toString());
        const preferL = 'en';
        if (!jsonData[userId]) {
            throw new Error(errorMessages.USER_ID_NOT_FOUND[preferL]);
        }

        return jsonData[userId];
    },

    createUser: async (userObject) => {
        const allUsers = await readFile(filePath);
        const jsonData = JSON.parse(allUsers.toString());

        const findUser = jsonData.find(user => user.email === userObject.email);
        const preferL = 'en';

        if (findUser) {
            throw new Error(errorMessages.USER_EXIST[preferL]);
        }

        jsonData.push(userObject);

        await writeFile(filePath, JSON.stringify(jsonData));
    },

    deleteUser: async (userName) => {
        const allUsers = await readFile(filePath);
        const jsonData = JSON.parse(allUsers.toString());

        const filterUser = jsonData.filter(user => user.name !== userName);
        const preferL = 'en';

        if (jsonData.length === filterUser.length) {
            throw new Error(errorMessages.USER_DOES_NOT_DELETE[preferL]);
        }

        await writeFile(filePath, JSON.stringify(filterUser));
    }
};
