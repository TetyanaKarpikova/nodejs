const Car = require('../dataBase/model/Car');

module.exports = {
    findCar: () => Car.find(),

    findCarById: (carID) => Car.findById(carID),

    createCar: (objectCar) => Car.create(objectCar),

    deleteCar: (carId) => Car.findByIdAndDelete(carId)
};
