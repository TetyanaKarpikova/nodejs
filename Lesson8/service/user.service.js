const { userModel } = require('../dataBase/model');
require('../dataBase/model/Car');

module.exports = {
    findUsers: (filterObject) => userModel.find(filterObject),

    findUserById: (userID) => userModel.findById(userID),

    createUser: (userObject) => userModel.create(userObject),

    deleteUser: (userID) => userModel.findByIdAndDelete(userID),

    findOneUser: (email) => userModel.findOne({ email }),

    updateUserById: (userId, updateObject) => userModel.updateOne({ _id: userId }, { $set: updateObject })
};
