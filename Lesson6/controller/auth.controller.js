const { userModel } = require('../dataBase/model');
const { o_authService } = require('../service');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                throw new Error('NO USER');
            }

            const tokens = await o_authService.createToken(user, password);

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }

};
