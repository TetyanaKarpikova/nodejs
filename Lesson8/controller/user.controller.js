/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
const path = require('path');
const fs = require('fs-extra').promises;
const uuid = require('uuid').v1;

const { mailService, userService } = require('../service');
const { passwordHasher } = require('../helper');
const { emailActionsEnum } = require('../constant');

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
                const { fileDir, finalFilePath, uploadPath } = _uploadDirBuilder(avatar.name, 'photos', user._id);

                await fs.mkdir(fileDir, { recursive: true });
                await avatar.mv(finalFilePath);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    const { fileDir, finalFilePath, uploadPath } = _uploadDirBuilder(docs[i].name, 'docs', user._id);

                    await fs.mkdir(fileDir, { recursive: true });
                    await docs[i].mv(finalFilePath);

                    await userService.updateUserById(user._id, { docs: uploadPath });
                }
            }

            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: name });

            res.json('User is created');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
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
            next(e);
        }
    }
};

function _uploadDirBuilder(itemName, itemType, itemId) {
    const pathWithoutStatis = path.join('user', `${itemId}`, `${itemType}`);
    const fileDir = path.join(process.cwd(), 'static', pathWithoutStatis);
    const fileExtension = itemName.split('.').pop();
    //   other way
    // const fileExtension = path.extname(avatar.name)

    const photoName = `${uuid()}.${fileExtension}`;
    // other way
    // const photoName = `${uuid()}${fileExtension}`;

    const finalFilePath = path.join(fileDir, photoName);
    const uploadPath = path.join(pathWithoutStatis, photoName);

    return { finalFilePath, uploadPath, fileDir };
}
