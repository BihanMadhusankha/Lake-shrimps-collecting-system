 const asyncHandler = require('express-async-handler');
 const Customer = require('../models/customerModel');

//@desc Get all customers
//@route GET /api/customers
//@access private
const getCustomer = asyncHandler(async (req, res) =>{
    const customers = await Customer.find({user_id: req.user.id});
    res.status(200).json(customers);
});

//@desc Create New customer
//@route Post /api/customers
//@access private
const createCustomer = asyncHandler(async (req, res) =>{
    console.log("The request body is: ", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const customer = await Customer.create({
        name:name,
        email:email,
        phone:phone,
        user_id:req.user.id
    });

    res.status(201).json(customer);
});

//@desc Get customers
//@route Get /api/customers/:id
//@access private
const getCustomers = asyncHandler(async (req, res) =>{
    const customers = await Customer.findById(req.params.id);
    if(!customers){
        res.status(404);
        throw new Error('Customer not found');
    }
    res.status(200).json(customers);
});

//@desc Update customers
//@route Put /api/customers/:id
//@access private
const updateCustomers = asyncHandler(async (req, res) =>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404);
        throw new Error('Customer not found');
    }

    if(customer.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error('User can not update other user customer');
    }

    const updateCustomers = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateCustomers)
});

//@desc Delete customers
//@route Delete /api/customers/:id
//@access private
const deleteCustomers =asyncHandler( async (req, res) =>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404);
        throw new Error('Customer not found');
    }

    if(customer.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error('User can not delete other user customer');
    }
    await customer.remove();
    res.status(200).json(customer);
});
  

module.exports = {
    getCustomer:getCustomer,
    createCustomer:createCustomer,
    getCustomers:getCustomers,
    updateCustomers:updateCustomers,
    deleteCustomers:deleteCustomers,

};