const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.checkIsUserValid,
    userMiddleware.checkIsAgeValid,
    userMiddleware.checkIsEmailExpect,
    userMiddleware.checkIsGenderValid,
    userController.createUser);

router.get('/:userId',
    userMiddleware.checkIsIdValid,
    userMiddleware.checkSearchUser,
    userController.getSingleUser);

router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
