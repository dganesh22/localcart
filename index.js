const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { StatusCodes } = require('http-status-codes')
const dbConnect = require('./db/connect')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT

const app = express()

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.ACCESS_SECRET)) // secure cookies
app.use(fileUpload({
    useTempFiles: true,
    limits: {
        fileSize: 5 *1024 *1024 // image file size upto 5Mb
    }
}))

app.use(express.static("./build"))

if(process.env.MODE === "development") {
    // inital route
app.get(`/`, async (req,res) => {
    return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "Welcome to Project-API"})
})
} else if (process.env.MODE === "production") {
    // inital route
app.get(`/`, async (req,res) => {
    return res.sendFile(path.resolve(__dirname,"./build/index.html"))
})
}

// api routes
app.use(`/api/auth`, require('./route/authRoute'))
app.use(`/api/category`, require('./route/categoryRoute'))
app.use(`/api/product`, require('./route/productRoute'))
app.use(`/api/cart`, require('./route/cartRoute'))
app.use(`/api/order`, require('./route/orderRoute'))
app.use(`/api/file`, require('./route/fileRoute'))
app.use(`/api/user`, require('./route/userRoute'))


// default route
app.all(`/*`, async (req,res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ status: true, msg: "Requested path not found"})
})

app.listen(PORT, () => {
    dbConnect()
    console.log(`server is started @ http://localhost:${PORT}`)
})