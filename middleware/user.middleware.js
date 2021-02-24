const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            
            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessages.NOT_VALID_ID['en']);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkIsUserValid: (req, res, next) => {
        try {
            const { name, email, password, preferL = 'en' } = req.body;            
            
            if (!name || !email || !password){                
                throw new Error(errorMessages.FIELD_IS_EMPTY[preferL]);
            }

            if (name.length < 3){                
                throw new Error(errorMessages.TOO_SHORT_NAME[preferL]);                
            }

            if (password.length < 8){                
                throw new Error(errorMessages.TOO_SHORT_PASSWORD[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }

}