const router = require('express').Router();

const carController = require('../controller/car.controller');
const { carMiddlewares } = require('../middleware');

router.get('/', carController.getAllCars);

router.post('/', carMiddlewares.checkIsCarValid, carController.createCar);

router.get('/:carId', carMiddlewares.checkIsIdValid, carController.getCarById);

router.delete('/:carId', carMiddlewares.checkIsIdValid, carController.deleteCar);

module.exports = router;
