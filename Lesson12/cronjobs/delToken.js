const { o_authModel } = require('../dataBase/model');

module.exports = async () => {
    const currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - 10);
    const dateString = currentDay.toISOString();

    const tokenizers = await o_authModel.deleteMany({ createdAt: { $lte: dateString } });

    // const tokenizers = await o_authModel.find({ createdAt: { $lte: new Date().toISOString() } });
    // const tokenizers = await o_authModel.find({ createdAt: { $lte: new Date('2021-03-06') } });

    console.log(tokenizers);
};
