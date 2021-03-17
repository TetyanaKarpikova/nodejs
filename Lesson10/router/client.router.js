const router = require('express').Router();

const { clientController } = require('../controller');

router.get('/', clientController.getAll);
router.post('/', clientController.createClient);

module.exports = router;
