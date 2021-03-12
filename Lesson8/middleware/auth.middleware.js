const jwt = require('jsonwebtoken');

const { constants, errorCodesEnum } = require('../constant');
const { o_authService } = require('../service');
const ErrorHandler = require('../error/ErrorHandler');
const errorMessage = require('../error/error.messages');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorMessage.TOKEN_IS_REQUIRED, errorCodesEnum.BAD_REQUEST);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorMessage.NOT_VALID_TOKEN, errorCodesEnum.AUTHORIZATION);
                }
            });

            const tokens = await o_authService.findAuth({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new ErrorHandler(errorMessage.NOT_VALID_TOKEN, errorCodesEnum.NOTFOUND);
            }

            req.user = tokens._user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorMessage.TOKEN_IS_REQUIRED, errorCodesEnum.BAD_REQUEST);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorMessage.NOT_VALID_TOKEN, errorCodesEnum.AUTHORIZATION);
                }
            });

            const tokens = await o_authService.findAuth({ refresh_token }).populate('_user_id');

            if (!tokens) {
                throw new ErrorHandler(errorMessage.NOT_VALID_TOKEN, errorCodesEnum.NOTFOUND);
            }

            req.refToken = tokens;

            next();
        } catch (e) {
            next(e);
        }
    }
};
