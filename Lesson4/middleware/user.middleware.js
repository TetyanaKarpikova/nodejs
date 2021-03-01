const errorMessages = require('../error/error.messages');
const errorCodes = require('../constant/errorCodes.enum');

// const userService = require('../service/user.service');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const preferL = 'en';

            if (userId.length !== 24) {
                throw new Error(errorMessages.NOT_VALID_ID[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkIsUserValid: (req, res, next) => {
        try {
            const { name, email, preferL = 'en' } = req.body;

            if (!name || !email) {
                throw new Error(errorMessages.FIELD_IS_EMPTY[preferL]);
            }

            if (name.length < 3) {
                throw new Error(errorMessages.TOO_SHORT_NAME[preferL]);
            }

            if (!email.match(/@/)) {
                throw new Error(errorMessages.EMAIL_WRONG[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkIsAgeValid: (req, res, next) => {
        try {
            const { age, preferL = 'en' } = req.body;

            if (!Number.isInteger(age) || Number.isNaN(age)) {
                throw new Error(errorMessages.AGE_IS_NUMBER[preferL]);
            }

            if (age < 0 || age > 125) {
                throw new Error(errorMessages.AGE_NOT_REAL[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkIsGenderValid: (req, res, next) => {
        try {
            const { gender, preferL = 'en' } = req.body;

            if (gender.toLowerCase() !== 'male' || gender.toLowerCase() !== 'female') {
                throw new Error(errorMessages.CHOOSE_GENDER[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.NOTFOUND).json(e.message);
        }
    }

};
