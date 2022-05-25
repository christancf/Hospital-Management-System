const mongoose = require('mongoose');



const transactionData = new mongoose.Schema({
patientId: {
required: true,
type: Number
},
type: {
required: true,
type: String
},
id: {
required: true,
type: String
},
count: {
required: true,
type: Number
},
billId: {
required: true,
type: String
},
patientName: {
required: true,
type: String
},
charge: {
required: true,
type: Number
},
total: {
required: true,
type: Number
}
})



module.exports = mongoose.model('transaction', transactionData)