const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  roles: [
    {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user"
    }
  ]
});

mongoose.model("Customer", CustomerSchema);
