const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.NOTFOUND).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = await req.params;
            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.NOTFOUND).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = { name, email, password };

            await userService.createUser(user);

            res.status(errorCodes.CREATED).json('USERS IS CREATED');
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { name } = req.body;

            await userService.deleteUser(name);

            res.status(errorCodes.OK).json('USER IS DELETE');
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
};
