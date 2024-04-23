const { StatusCodes } = require("http-status-codes")
const User = require('../model/user')

// this middleware checks the user role must be "superadmin"

const adminAuth = async (req,res,next) => {
    try {
        // read id from previous middleware (auth)
        let id = req.userId 
        // get the user data from id
        let extUser = await User.findById(id)
            if(!extUser)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested user id not found`})

        // check the role
        if(extUser.role !== "superadmin")
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: `UnAuthorized. Access denied for non-admin users`})

        // continue execution to next controller
        next()
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}

module.exports = adminAuth