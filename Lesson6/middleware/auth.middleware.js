const jwt = require('jsonwebtoken');

const { constants } = require('../constant');
const { o_authService } = require('../service');
const { JWT_SECRET } = require('../config/config');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error('Token is required');
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error('Not valid token');
                }
            });

            const tokens = await o_authService.findAuth({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error('Not valid token');
            }

            req.user = tokens._user_id;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
