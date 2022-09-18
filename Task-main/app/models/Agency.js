const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agencySchema = Schema({
  AgencyId: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Address1: {
    type: String,
    required: true,
  },
  Address2: {
    type: String,
  },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Agency", agencySchema);
