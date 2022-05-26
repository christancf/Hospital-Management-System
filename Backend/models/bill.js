const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  patient_name: {
    required: true,
    type: String,
  },
  patient_id: {
    required: true,
    type: String,
  },
  room_charges: {
    required: true,
    type: Number,
  },
  item_charges: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: String,
  },
  payment_date: {
    required: false,
    type: Number,
  },
});

module.exports = mongoose.model("bills", dataSchema);