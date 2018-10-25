const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  number: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["created", "done"],
    default: "created"
  },
  items: [
    {
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    }
  ],
  createAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

mongoose.model("Order", OrderSchema);
