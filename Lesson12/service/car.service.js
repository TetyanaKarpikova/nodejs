const { carModel } = require('../dataBase/model');
const { queriesSerchHelper } = require('../helper');

module.exports = {
    findCar: async (query = {}) => {
        const { filterObject,
            filters,
            keys,
            limit,
            page,
            skip,
            sort } = await queriesSerchHelper.commonSearch(query);

        keys.forEach((key) => {
            switch (key) {
                case 'model':
                    filterObject.model = { $regex: filters.model, $options: 'i' };
                    break;
                case 'priceGte':
                    filterObject.price = Object.assign({}, filterObject.price, { $gte: +filters.priceGte });
                    break;
                case 'priceLte':
                    filterObject.price = Object.assign({}, filterObject.price, { $lte: +filters.priceLte });
                    break;
                case 'engineGte':
                    filterObject.engine = Object.assign({}, filterObject.engine, { $gte: +filters.engineGte });
                    break;
                case 'engineLte':
                    filterObject.engine = Object.assign({}, filterObject.engine, { $lte: +filters.engineLte });
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const cars = await carModel.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await carModel.countDocuments(filterObject);

        return {
            data: cars,
            perPage: page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },

    findCarById: (carID) => carModel.findById(carID),

    createCar: (objectCar) => carModel.create(objectCar),

    deleteCar: (carId) => carModel.findByIdAndDelete(carId),

    updateCarById: (carId, updateObject) => carModel.updateOne({ _id: carId }, { $set: updateObject })
};
