const categoryRoute = require('express').Router()
const { createCategory, readAllCategory, readSingleCategory, updateCategory, deleteCategory} = require('../controller/categoryCtrl')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

// without auth
categoryRoute.get(`/all`,  readAllCategory)
categoryRoute.get(`/single/:id`, readSingleCategory)

// with auth (admin)
categoryRoute.post(`/add`, auth, adminAuth, createCategory)
categoryRoute.patch(`/update/:id`, auth, adminAuth, updateCategory)
categoryRoute.delete(`/delete/:id`, auth, adminAuth, deleteCategory)

module.exports = categoryRoute