module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/sep-2020',
    JWT_SECRET: process.env.JWT_SECRET || 'FIRST',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'SECOND',
    PORT: 5000,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'testEmail@gmail.om',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '1237654'
};
