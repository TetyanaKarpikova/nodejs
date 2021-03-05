const User = require('../dataBase/model/User');
require('../dataBase/model/Car');

module.exports = {
    findUsers: (filterObject) => User.find(filterObject),

    findUserById: (userID) => User.findById(userID),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (userID) => User.findByIdAndDelete(userID)
};
