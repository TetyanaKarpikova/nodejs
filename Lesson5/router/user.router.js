const router = require('express').Router();

const userController = require('../controller/user.controller');
const { userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddlewares.checkIsUserValid,
    userController.createUser);

router.get('/:userId',
    userMiddlewares.checkIsIdValid,
    userMiddlewares.checkSearchUser,
    userController.getSingleUser);

router.delete('/:userId',
    userMiddlewares.checkIsIdValid,
    userController.deleteUser);

module.exports = router;
