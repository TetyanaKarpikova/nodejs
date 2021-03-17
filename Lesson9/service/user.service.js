const { userModel } = require('../dataBase/model');
require('../dataBase/model/Car');
const { queriesSerchHelper } = require('../helper');

module.exports = {
    findUsers: async (query = {}) => {
        const { filterObject,
            filters,
            keys,
            limit,
            page,
            skip,
            sort } = await queriesSerchHelper.commonSearch(query);

        keys.forEach((key) => {
            switch (key) {
                case 'ageGte':
                    filterObject.age = Object.assign({}, filterObject.age, { $gte: +filters.ageGte });
                    break;
                case 'ageLte':
                    filterObject.age = Object.assign({}, filterObject.age, { $lte: +filters.ageLte });
                    break;
                // case 'category':
                //     const categories = filters.category.split(';');
                //     filterObject.categories = { $in: categories };
                //     break;
                case 'name':
                    // регулярка; пошук по частини назви
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const users = await userModel.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await userModel.countDocuments(filterObject);

        return {
            data: users,
            perPage: page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },

    findUserById: (userID) => userModel.findById(userID),

    createUser: (userObject) => userModel.create(userObject),

    deleteUser: (userID) => userModel.findByIdAndDelete(userID),

    findOneUser: (email) => userModel.findOne({ email }),

    updateUserById: (userId, updateObject) => userModel.updateOne({ _id: userId }, { $set: updateObject })
};
