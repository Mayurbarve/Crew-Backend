import mongoose from 'mongoose';

const OrderHistorySchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number }],
  customer: {
    firstName: String,
    email: String,
    phone: String,
    tableNo: Number,
  },
  amount: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const OrderHistory = mongoose.model('OrderHistory', OrderHistorySchema);
export default OrderHistory;
