const ErrorHandler = require('../error/ErrorHandler');

const { carValidators } = require('../validator');

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const [error] = await carValidators.idCarValidator.validate({ id: userId });

            if (error) {
                throw new ErrorHandler(error.details[0].message, 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsCarValid: (req, res, next) => {
        try {
            const { error } = carValidators.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
