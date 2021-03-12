const errorMessages = require('../error/error.messages');
const ErrorHandler = require('../error/ErrorHandler');
const { errorCodesEnum } = require('../constant');

const userService = require('../service/user.service');

const { userValidators } = require('../validator');

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { error } = await userValidators.idUserValidator.validate({ id: userId });

            if (error) {
                throw new ErrorHandler(error.details[0].message, errorCodesEnum.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, errorCodesEnum.BAD_REQUEST);
            }

            const { email, preferL = 'en' } = req.body;

            const userEmail = await userService.findUsers({ email });

            if (userEmail.length > 0) {
                throw new ErrorHandler(errorMessages.EMAIL_IS_EXIST[preferL], errorCodesEnum.BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkSearchUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.query;

            const user = await userService.findUserById(userId);

            if (!user) {
                throw new ErrorHandler(errorMessages.NOT_VALID_USER[preferL], errorCodesEnum.BAD_REQUEST);
            }

            const { error } = await userValidators.searchUserValidator.validate(user.toObject());

            if (error) {
                throw new ErrorHandler(error.details[0].message, errorCodesEnum.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
