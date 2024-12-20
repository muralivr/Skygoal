const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    s_no: { type: Number, unique: true, required: true },
    name_of_customer: { type: String, required: true },
    email: { type: String, required: true },
    mobile_number: { type: String, required: true },
    dob: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Apply indexes for optimization
customerSchema.index({ email: 1, mobile_number: 1 }); // Compound index on email and mobile_number

const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;
