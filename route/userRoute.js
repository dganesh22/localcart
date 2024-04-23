const userRoute = require("express").Router()
const { readAllUsers, updateUser } = require("../controller/userCtrl")

userRoute.get("/all", readAllUsers)
userRoute.patch("/update/:id", updateUser)


module.exports = userRoute