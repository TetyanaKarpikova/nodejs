/* eslint-disable no-await-in-loop */
const fs = require('fs-extra');

const { carService, fileService } = require('../service');
const { successMessagesEnum } = require('../constant');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findCar();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const { photos, docs } = req;

            const car = await carService.createCar(req.body);

            if (photos) {
                for (let i = 0; i < photos.length; i++) {
                    const { fileDir, finalFilePath, uploadPath } = await fileService
                        .uploadDirBuilder('car', photos[i].name, 'photos', car._id);

                    await fs.mkdir(fileDir, { recursive: true });
                    await photos[i].mv(finalFilePath);

                    await carService.updateCarById(car._id, { photos: uploadPath });
                }
            }

            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    const { fileDir, finalFilePath, uploadPath } = await fileService
                        .uploadDirBuilder('car', docs[i].name, 'docs', car._id);

                    await fs.mkdir(fileDir, { recursive: true });
                    await docs[i].mv(finalFilePath);

                    await carService.updateCarById(car._id, { docs: uploadPath });
                }
            }

            res.status(201).json(successMessagesEnum.CAR_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(201).json(successMessagesEnum.CAR_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
