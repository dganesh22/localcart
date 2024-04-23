const { StatusCodes } = require('http-status-codes')
const UserModel = require('../model/user')

// read all user info except admin
const readAllUsers = async (req,res) => {
    try {
        let data = await UserModel.find({})

        res.status(StatusCodes.OK).json({ status: true, length: data.length, users: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

const updateUser = async (req,res) => {
    try {
        let id = req.params.id 
        let data = await UserModel.findById({_id: id })
            if(!data)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg : `Requested user id not found`})

        await UserModel.findByIdAndUpdate({ _id: data._id }, req.body)

        res.status(StatusCodes.OK).json({ status: true, msg: "User data updated successfully", user: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}




module.exports = { readAllUsers, updateUser }