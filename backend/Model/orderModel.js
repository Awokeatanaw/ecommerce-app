
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User who placed the order
    items: { type: Array, required: true }, // Array of items in the order
    amount: { type: Number, required: true }, // Total amount for the order
    address: { type:Object,required:true},
    status: { type: String, required: true, default: 'Order Placed' }, // Order status
    paymentMethod: { type: String, required: true }, // Payment method used
    payment: { type: Boolean, required: true, default: false }, // Payment status
    date: { type: Number, required: true }, // Date of delivery
    
});

// Create the Order model
const OrderModel = mongoose.models.order || mongoose.model('Order', orderSchema);

export default OrderModel;