const { errorCodesEnum } = require('../constant');

const { carValidators } = require('../validator');

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const [error] = await carValidators.idCarValidator.validate({ id: userId });

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    checkIsCarValid: (req, res, next) => {
        try {
            const { error } = carValidators.createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
