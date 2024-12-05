const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    material: {
        type: String
    },
    carat: {
        type: Number
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
});

const inventory = mongoose.model('inventory', inventorySchema);

module.exports = inventory;