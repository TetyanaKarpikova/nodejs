const { o_authService, userService } = require('../service');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userService.findOneUser(email);

            if (!user) {
                throw new Error('NO USER');
            }

            const tokens = await o_authService.createToken(user, password);

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    },

    refreshToken: async (req, res) => {
        try {
            const { refToken } = req;

            const tokens = await o_authService.newToken(refToken);

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }

};
