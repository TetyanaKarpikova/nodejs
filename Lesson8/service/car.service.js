const { carModel } = require('../dataBase/model');

module.exports = {
    findCar: () => carModel.find(),

    findCarById: (carID) => carModel.findById(carID),

    createCar: (objectCar) => carModel.create(objectCar),

    deleteCar: (carId) => carModel.findByIdAndDelete(carId),

    updateCarById: (carId, updateObject) => carModel.updateOne({ _id: carId }, { $set: updateObject })
};
