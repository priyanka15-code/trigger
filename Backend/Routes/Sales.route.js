const express = require('express');
const mongoose = require('mongoose');
const Sales = require('../Models/Sales.model');
const Customer = require('../Models/Customers.model');
const Inventory = require('../Models/Inventory.model');
const router = express.Router();


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const validateItems = (items) => {
    const errors = [];
    items.forEach((item, index) => {
        if (!isValidObjectId(item.itemId)) {
            errors.push({ index, message: `Invalid itemId: ${item.itemId}` });
        }
        if (isNaN(item.quantity) || item.quantity <= 0) {
            errors.push({ index, message: `Invalid quantity for itemId: ${item.itemId}` });
        }
    });
    return errors;
};

// Create Sale
router.post('/', async (req, res) => {
    try {
        const { customerId, items, totalAmount } = req.body;

        if (!isValidObjectId(customerId)) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }

        const itemErrors = validateItems(items);
        if (itemErrors.length > 0) {
            return res.status(400).json({ message: 'Invalid items data', errors: itemErrors });
        }

        const sale = new Sales({ customerId, items, totalAmount: Number(totalAmount) });
        await sale.save();
        res.status(201).json({ message: 'Sale created successfully', sale });
    } catch (error) {
        res.status(500).json({ message: 'Error creating sale', error: error.message });
    }
});

// Get All Sales
router.get('/', async (req, res) => {
    try {
        const sales = await Sales.find()
            /* .populate('customerId')
            .populate('items.itemId');  */
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales', error: error.message });
    }
});

// Get Sale by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid sale ID' });
        }

        const sale = await Sales.findById(id).populate('customerId').populate('items.itemId');
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sale', error: error.message });
    }
});

// Update Sale
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { customerId, items, totalAmount } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid sale ID' });
        }

        if (customerId && !isValidObjectId(customerId)) {
            return res.status(400).json({ message: 'Invalid customer ID' });
        }

        const itemErrors = validateItems(items || []);
        if (itemErrors.length > 0) {
            return res.status(400).json({ message: 'Invalid items data', errors: itemErrors });
        }

        const sale = await Sales.findByIdAndUpdate(
            id,
            { customerId, items, totalAmount },
            { new: true }
        );

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json({ message: 'Sale updated successfully', sale });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sale', error: error.message });
    }
});

// Delete Sale
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid sale ID' });
        }

        const sale = await Sales.findByIdAndDelete(id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sale', error: error.message });
    }
});

module.exports = router;
