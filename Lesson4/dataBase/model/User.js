/* eslint-disable func-names */
const { Schema, model } = require('mongoose');

// const carSubSheme = {
//     model: { type: String },
//     price: { type: Number }
// };

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    gender: { type: String },
    email: { type: String, required: true },
    // cars: [carSubSheme]
    cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }]

}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('full_name').get(function() {
    return `${this.name} ${this.age}`;
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
    // options: { select: 'model' }
});

userScheme
    .pre('find', function() {
        this.populate('userCars');
    })
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model('User', userScheme);
