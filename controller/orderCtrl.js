const Order = require('../model/order')
const { StatusCodes } = require('http-status-codes')

// create
const createOrder = async (req,res) => {
    try {
        let { cartId, userId, paymentId, paymentMode, paymentStatus, orderStatus, deliveryStatus } = req.body

        let extOrder = await Order.findOne({ cartId })
            if(extOrder)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Order is already confirmed for cart items`})

        let newOrder = await Order.create({
            cartId,
            userId,
            paymentId,
            paymentMode,
            paymentStatus,
            orderStatus,
            deliveryStatus
        })

        return res.status(StatusCodes.CREATED).json({ status:true, msg: "Order Placed successfully", order: newOrder })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// all
const allOrder = async (req,res) => {
    try {
            // read all orders
        let orderData = await Order.find({})
        // reading current user id => middleware auth
        let id = req.userId
            // filtering orders w.r.to current user id
        let data = await orderData.filter(item => item.userId == id)

        return res.status(StatusCodes.OK).json({ status: true, length: data.length, orders: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// single
const singleOrder = async (req,res) => {
    try {
        let id = req.params.id 

        let extOrder = await Order.findById(id)

            if(!extOrder)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested order id not found`})

        // other than current user can't authorized access order details
            if(extOrder.userId != req.userId)
                return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: `Unauthorized to see order details`})

            
        return res.status(StatusCodes.OK).json({ status: true, order: extOrder })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// update
const updateOrder = async (req,res) => {
    try {
        let id = req.params.id 

        let extOrder = await Order.findById(id)
            if(!extOrder)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested order id not found`})

        // update
        await Order.findByIdAndUpdate({_id: id }, req.body)

        return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "order updated successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// delete
const deleteOrder = async (req,res) => {
    try {
        let id = req.params.id 

        let extOrder = await Order.findById(id)
            if(!extOrder)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested order id not found`})

        // update
        await Order.findByIdAndDelete({_id: id })

        return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "order deleted successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { createOrder, allOrder, singleOrder, updateOrder, deleteOrder}