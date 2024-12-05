const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Customer = require('../Models/Customers.model');

// create customers
router.post('/', async (req, res) => {
    try {
        const { name, email, loyaltyPoints, purchaseHistory } = req.body;
        const validPurchaseHistory = Array.isArray(purchaseHistory)
        ? purchaseHistory.filter(id => mongoose.Types.ObjectId.isValid(id))
        : mongoose.Types.ObjectId.isValid(purchaseHistory) ? [purchaseHistory] : [];

        // Create new customer
        const customer = new Customer({ name, email, loyaltyPoints, purchaseHistory: validPurchaseHistory });
        
        // Save customer to database
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ message: 'Error creating customer', error: err });
    }
})

// Get customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().populate('purchaseHistory');
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customers', error: err });
    }
});

// GET customers by id
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('purchaseHistory');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customer', error: err });
    }
});

// update customers
router.put('/:id', async (req, res) => {
    try {
        const { name, email, loyaltyPoints, purchaseHistory } = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, email, loyaltyPoints, purchaseHistory },
            { new: true }
        );
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ message: 'Error updating customer', error: err });
    }
});

// Delete customers
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting customer', error: err });
    }
});

module.exports = router;
