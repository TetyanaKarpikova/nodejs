const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authController.authUser);
router.post('/refresh', authMiddleware.checkToken, authController.authUser);

module.exports = router;
