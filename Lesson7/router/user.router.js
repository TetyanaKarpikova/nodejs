const router = require('express').Router();

const userController = require('../controller/user.controller');
const { authMiddleware, userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddlewares.checkIsUserValid,
    userController.createUser);

router.use('/:userId', userMiddlewares.checkIsIdValid);
router.get('/:userId',
    userMiddlewares.checkSearchUser,
    userController.getSingleUser);

router.delete('/:userId',
    authMiddleware.checkAccessTokenMiddleware,
    userController.deleteUser);

module.exports = router;
