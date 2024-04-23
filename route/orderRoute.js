const orderRoute = require('express').Router()
const { createOrder, allOrder, singleOrder, updateOrder, deleteOrder } = require('../controller/orderCtrl')
const auth = require('../middleware/auth')

orderRoute.post(`/add`, auth, createOrder)
orderRoute.get(`/all`, auth, allOrder)
orderRoute.get(`/single/:id`, auth, singleOrder)
orderRoute.patch(`/update/:id`, auth, updateOrder)
orderRoute.delete(`/delete/:id`, auth, deleteOrder)

module.exports = orderRoute