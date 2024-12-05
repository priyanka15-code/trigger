const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    loyaltyPoints: {
        type: Number,
        default: 0

    },
    purchaseHistory: [{
        type: mongoose.Types.ObjectId, 
        ref: 'Sales'
    }],
});


const customer = mongoose.model('customer', customerSchema);

module.exports = customer;
