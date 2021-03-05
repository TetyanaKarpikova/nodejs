const { o_authModel } = require('../dataBase/model');
const { passwordHasher, tokenizer } = require('../helper');

module.exports = {
    createToken: async (user, password) => {
        await passwordHasher.compare(password, user.password);

        const tokens = tokenizer();

        await o_authModel.create({ ...tokens, _user_id: user._id });

        return tokens;
    },

    findAuth: (auth) => o_authModel.findOne(auth),

    refreshToken: async (user, userIdToken) => {
        await o_authModel.findByIdAndDelete(userIdToken);

        const tokens = tokenizer();

        await o_authModel.create({ ...tokens, _user_id: user._id });

        return tokens;
    }

};
