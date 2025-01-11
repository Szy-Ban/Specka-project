const mongoose = require('mongoose')
const calculateTotalPrice = require('../middlewares/calculateTotalPrice');

const orderItemSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

const shippingAddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        maxlength: 64,
        minlength: 3,
    },
    city: {
        type: String,
        required: true,
        maxlength: 64,
        minlength: 3,
    },
    country: {
        type: String,
        required: true,
        maxlength: 64,
        minlength: 3,
    },
    zipCode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5,
    }
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    shippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped','delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        default: 'credit_card'
    },
    shippingAddress: {
        type: shippingAddressSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

calculateTotalPrice(orderSchema);

const order = mongoose.model('Order', orderSchema)
module.exports = order;