const express = require('express');
const {
  getCustomers,
} = require('../controller/CustomerController');

const customerRouter = express.Router();

// Routes
customerRouter.get('/getcustomers', getCustomers); // Fetch customers with pagination, search, and filters


module.exports = customerRouter;
