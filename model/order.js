const mongoose = require('mongoose')
const Cart = require('./cart')
const User = require('./user')

const OrderSchema = new mongoose.Schema({
    
    paymentId: {
        type: String,
        trim: true
    },
    paymentMode: {
        type: String,
        trim: true,
        enum: ["cod", "online"],
        default: "cod"
    },
    paymentStatus: {
        type: String,
        trim:true,
        enum: ["pending", "success","failed"],
        default: "pending"
    },
    orderStatus: {
        type: String,
        trim: true,
        enum: ["pending", "confirmed","canceled"],
        default: "pending"
    },
    deliveryStatus: {
        type: String,
        trim: true,
        enum: ["pending","processing", "delivered", "returned"],
        default: "pending"
    }
},{
    collection: "order",
    timestamps: true
})

module.exports = mongoose.model("Order", OrderSchema)