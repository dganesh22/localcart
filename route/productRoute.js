const productRoute = require('express').Router()
const { readAllProduct, readSingleProduct, createProduct, updateProduct, deleteProduct } = require('../controller/productCtrl')
const auth =require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

// with out auth
productRoute.get(`/all`, readAllProduct)
productRoute.get(`/single/:id`, readSingleProduct)

// with auth (admin)
productRoute.post(`/add`,auth,adminAuth, createProduct)
productRoute.patch(`/update/:id`,auth,adminAuth, updateProduct)
productRoute.delete(`/delete/:id`,auth,adminAuth, deleteProduct)

module.exports = productRoute