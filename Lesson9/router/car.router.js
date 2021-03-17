const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddlewares, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.post('/',
    fileMiddleware.checkFileMiddleware,
    carMiddlewares.checkIsCarValid,
    carController.createCar);

router.get('/:carId', carMiddlewares.checkIsIdValid, carController.getCarById);

router.delete('/:carId', carMiddlewares.checkIsIdValid, carController.deleteCar);

module.exports = router;
