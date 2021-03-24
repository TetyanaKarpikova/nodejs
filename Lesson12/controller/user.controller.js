/* eslint-disable no-await-in-loop */
const fs = require('fs-extra').promises;

const { mailService, fileService, userService } = require('../service');
const { passwordHasher } = require('../helper');
const { emailActionsEnum, successMessagesEnum } = require('../constant');
const errorMessages = require('../error/error.messages');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { body: { name, email, password }, avatar, docs } = req;

            const hasPassword = await passwordHasher.hash(password);

            const user = await userService.createUser({ ...req.body, password: hasPassword });

            if (avatar) {
                const { fileDir, finalFilePath, uploadPath } = await fileService
                    .uploadDirBuilder('user', avatar.name, 'photos', user._id);

                await fs.mkdir(fileDir, { recursive: true });
                await avatar.mv(finalFilePath);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    const { fileDir, finalFilePath, uploadPath } = await fileService
                        .uploadDirBuilder('user', docs[i].name, 'docs', user._id);

                    await fs.mkdir(fileDir, { recursive: true });
                    await docs[i].mv(finalFilePath);

                    await userService.updateUserById(user._id, { docs: uploadPath });
                }
            }

            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: name });

            res.json(successMessagesEnum.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            if (userId !== req.user._id.toString()) {
                throw new Error(errorMessages.UNAUTHORIZED);
            }

            const { email, name } = req.user;

            await mailService.sendMail(email, emailActionsEnum.DELETE_EMAIL, { userName: name });

            await userService.deleteUser(userId);

            res.json(successMessagesEnum.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
