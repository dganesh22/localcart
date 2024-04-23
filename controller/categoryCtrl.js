const { StatusCodes } = require('http-status-codes')
const Category = require('../model/category')

// create 
const createCategory = async (req,res) => {
    try {
        const { name, desc } = req.body

        // check if name already exists or not
        let extCat = await Category.findOne({name})
            if(extCat)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Category ${name} already exists.`})

        // creat a new category
        let newCat = await Category.create({
            name,
            desc
        })

        res.status(StatusCodes.CREATED).json({ status: true, msg: "New category created", category: newCat })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// read all
const readAllCategory = async (req,res) => {
    try {
        // read all categories from db
        let data = await Category.find()

        res.status(StatusCodes.OK).json({ status: true,length: data.length, categories: data})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// read single
const readSingleCategory = async (req,res) => {
    try {
        // read single category id from params
        let id = req.params.id

        // search for category in db
        let data = await Category.findById(id)

        // if id not found
        if(!data)
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "Requested category id not found"})

        res.status(StatusCodes.OK).json({ status: true, category: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// update
const updateCategory = async (req,res) => {
    try {
        // read params and data 
        let id = req.params.id
        let { name, desc } = req.body

        
        // search for category in db
        let data = await Category.findById(id)

        // if id not found
        if(!data)
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "Requested category id not found"})

        // update
        await Category.findByIdAndUpdate({_id: id}, { name, desc })

        res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "Category updated successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// delete
const deleteCategory = async (req,res) => {
    try {
        
         // read single category id from params
         let id = req.params.id

         // search for category in db
         let data = await Category.findById(id)
 
         // if id not found
         if(!data)
             return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "Requested category id not found"})

        // to delete a category
        await Category.findByIdAndDelete(id)

        res.status(StatusCodes.ACCEPTED).json({ status:true, msg: "Category deleted successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { createCategory, readAllCategory, readSingleCategory, updateCategory, deleteCategory}