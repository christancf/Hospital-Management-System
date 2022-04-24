const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    nurseID: {
      required: true,
      type: Number
    },
    assignedDate: {
      required: true,
      type: Number
    },
    reassignDate: {
      required: true,
      type: Number
    },
    wardCategory: {
      required: true,
      type: String
    },
    wardID: {
      required: true,
      type: String
    },
    role: {
      required: false,
      type: String
    }
})

module.exports = mongoose.model('assignednurses', dataSchema)