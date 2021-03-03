const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { CAR } } = require('../../constant');

const carScheme = new Schema({
    model: { type: String, required: true },
    engine: { type: Number, default: 1.2 },
    color: { type: String, default: 'white' },
    price: { type: Number, reauired: true }
});

module.exports = model(CAR, carScheme);
