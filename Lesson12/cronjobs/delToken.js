const { o_authModel } = require('../dataBase/model');

module.exports = async () => {
    const tokenizers = await o_authModel.deleteMany({ createdAt: { $lte: new Date().toISOString() } });

    // const tokenizers = await o_authModel.find({ createdAt: { $lte: new Date().toISOString() } });
    // const tokenizers = await o_authModel.find({ createdAt: { $lte: new Date('2021-03-06') } });

    console.log(tokenizers);
};
