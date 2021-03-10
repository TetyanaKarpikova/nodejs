const { mailService, userService } = require('../service');
const { passwordHasher } = require('../helper');
const { emailActionsEnum } = require('../constant');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password, email, name } = req.body;

            const hasPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hasPassword });

            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: name });

            res.status(201).json('User is created');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;

            if (userId !== req.user._id.toString()) {
                throw new Error('Unauthorized');
            }

            const { email, name } = req.user;

            await mailService.sendMail(email, emailActionsEnum.DELETE_EMAIL, { userName: name });

            await userService.deleteUser(userId);

            res.json(`${userId} is deleted`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
