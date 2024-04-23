const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required:true,
            trim: true
        },
        image: {
            type: String,
            default: ""
            
        },
        desc: {
            type: String,
            required: true,
            trim: true
        },
        price:{
            type: Number,
            default: 0
        },
        SKU: {  // stock keeping unit
            type: String,
            default: ""
        },
        category: {
            type: String,
            required: true,
            trim:true
        },
        discount: {
            type: Number,
            default: 0
        },
        tax: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },{
        collection: "products",
        timestamps: true
    })

    module.exports = mongoose.model("Product", ProductSchema)