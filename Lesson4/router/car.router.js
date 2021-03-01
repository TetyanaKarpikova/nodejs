const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.getAllCars);

router.post('/', carMiddleware.checkIsCarValid, carController.createCar);

router.get('/:carId', carMiddleware.checkIsIdValid, carController.getCarById);

router.delete('/:carId', carMiddleware.checkIsIdValid, carController.deleteCar);

module.exports = router;
