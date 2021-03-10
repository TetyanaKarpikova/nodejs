const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: (password, hashPassword) => {
        const isPasswordEuels = bcrypt.compare(password, hashPassword);

        if (!isPasswordEuels) {
            throw new Error('Wrong email or password');
        }
    }
};
