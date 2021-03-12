const router = require('express').Router();

const userController = require('../controller/user.controller');
const { authMiddleware, fileMiddleware, userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkFileAvatar,
    userMiddlewares.checkIsUserValid,
    userController.createUser);

router.get('/:userId',
    userMiddlewares.checkIsIdValid,
    userMiddlewares.checkSearchUser,
    userController.getSingleUser);

router.delete('/:userId',
    authMiddleware.checkAccessTokenMiddleware,
    userController.deleteUser);

module.exports = router;
