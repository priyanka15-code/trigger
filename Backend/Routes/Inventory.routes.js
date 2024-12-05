const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Inventory = require('../Models/Inventory.model')

// create inventory
router.post('/', async (req, res) => {
    try {
        const { name, material, carat, stock, price, category } = req.body;
        const inventoryItem = new Inventory({ name, material, carat, stock, price, category });
        await inventoryItem.save();
        res.status(201).json(inventoryItem);
    } catch (err) {
        res.status(500).json({ message: 'Error creating inventory item', error: err });
    }
});

// Get inventory
router.get('/', async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();
        res.status(200).json(inventoryItems);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching inventory', error: err });
    }
});

// Get inventory by id
router.get('/:id', async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json(inventoryItem);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching inventory item', error: err });
    }
});

// Update inventory
router.put('/:id', async (req, res) => {
    try {
        const { name, material, carat, stock, price, category } = req.body;
        const inventoryItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            { name, material, carat, stock, price, category },
            { new: true }
        );
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json(inventoryItem);
    } catch (err) {
        res.status(500).json({ message: 'Error updating inventory item', error: err });
    }
});

// Delete inventory
router.delete('/:id', async (req, res) => {
    try {
        const inventoryItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(200).json({ message: 'Inventory item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting inventory item', error: err });
    }
});


module.exports = router;