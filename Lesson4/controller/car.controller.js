const carService = require('../service/car.service');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findCar();

            res.json(cars);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.status(201).json('Car is created');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(201).json('Car is deleted');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
