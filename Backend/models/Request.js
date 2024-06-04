const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  deliveryOption: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Add this line
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
