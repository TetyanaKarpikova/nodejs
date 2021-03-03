const { errorCodesEnum } = require('../constant');
const errorMessages = require('../error/error.messages');

const userService = require('../service/user.service');

const { userValidators } = require('../validator');

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { error } = await userValidators.idUserValidator.validate({ id: userId });

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            const { email, preferL = 'en' } = req.body;

            const userEmail = await userService.findUsers({ email });

            if (userEmail.length > 0) {
                throw new Error(errorMessages.EMAIL_IS_EXIST[preferL]);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    checkSearchUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.query;

            const user = await userService.findUserById(userId);

            if (!user) {
                throw new Error(errorMessages.NOT_VALID_USER[preferL]);
            }

            const { error } = await userValidators.searchUserValidator.validate(user.toObject());

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.NOTFOUND).json(e.message);
        }
    }
};
