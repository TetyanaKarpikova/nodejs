const router = require('express').Router();

const { clientController } = require('../controller');

router.get('/', clientController.getAll);
router.post('/', clientController.createClient);

router.get('/:id', clientController.getOneClientById);
router.delete('/:id', clientController.delOneClientById);

module.exports = router;
