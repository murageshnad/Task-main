const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = Schema({
  ClientId: {
    type: String,
    required: true,
  },
  AgencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
  },
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  TotalBill: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", clientSchema);
