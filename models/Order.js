const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  record: [
    {
      ref: "Record",
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

module.exports = mongoose.model("Order", OrderSchema);
