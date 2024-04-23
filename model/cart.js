const mongoose = require('mongoose')
const User = require('./user')

const CartSchema = new mongoose.Schema({
    user: {
        type: Object,
        default: {}
    },
    products: {
        type: Array,
        default: []
    },
    shipping: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    final: {
        type: Number,
        default: 0
    }
},{
    collection: "cart",
    timestamps: true
})

module.exports = mongoose.model("Cart", CartSchema)