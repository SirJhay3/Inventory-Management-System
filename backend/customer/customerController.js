const { Customers } = require('./customerModel');
const { Sales } = require('../sales/salesModel');

// get all customers
const getAllCustomers = async (req, res) => {
    res.json(res.paginatedResults);
};

const singleCustomerSalesDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const sales = await Sales.find({ customerName: id })
        res.status(200).json(sales)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// add a new customer
const addCustomer = async (req, res) => {
    const { name, address, phoneNo, email, userName, password } = req.body;
    
    try {
        // create document with payload
        const customer =  await Customers.create({
            name,
            address,
            phoneNo,
            // email,
            // userName, 
            // password
        })

        res.status(200).json({customer, message: 'Customer Added Successfully'})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { addCustomer, getAllCustomers, singleCustomerSalesDetails };