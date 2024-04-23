const fileRoute = require('express').Router()
const { uploadImage, deleteImage } = require('../controller/fileCtrl')


fileRoute.post(`/upload`, uploadImage)
fileRoute.delete(`/delete`, deleteImage)

module.exports = fileRoute