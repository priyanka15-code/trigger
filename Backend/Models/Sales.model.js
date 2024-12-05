const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Types.ObjectId,  
        ref: 'Customer',
        required: true
    },
    items: [{
        itemId: {
            type: mongoose.Types.ObjectId,  
            ref: 'Inventory',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
