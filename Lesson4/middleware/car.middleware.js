const errorMessages = require('../error/error.messages');
const errorCodes = require('../constant/errorCodes.enum');

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

    checkIsCarValid: (req, res, next) => {
        try {
            const { model, price, preferL = 'en' } = req.body;

            if (!model || !price) {
                throw new Error(errorMessages.FIELD_CAR_IS_EMPTY[preferL]);
            }

            if (model.length > 255) {
                throw new Error(errorMessages.TOO_LONG_NAME_MODEL[preferL]);
            }

            if (price < 0) {
                throw new Error(errorMessages.PRICE_NEGATIVE[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
