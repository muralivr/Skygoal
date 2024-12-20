const CustomerModel = require("../models/Customer");

// Controller to fetch customers with pagination, search, and filtering
// const getCustomers = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = '', filterField, filterValue } = req.query;

//     const query = {};

//     // Search logic for name_of_customer and email
//     if (search) {
//       query.$or = [
//         { name_of_customer: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } },
//       ];
//     }

//     // Filter logic for a specific field
//     if (filterField && filterValue) {
//       query[filterField] = filterValue;
//     }

//     // Pagination logic
//     const skip = (page - 1) * limit;
//     const customers = await CustomerModel.find(query).skip(skip).limit(parseInt(limit));
//     console.log(customers)
//     const total = await CustomerModel.countDocuments(query);

//     return res.status(200).json({
//         customers, // Make sure you're sending 'customers' field, not 'data'
//         totalPages: Math.ceil(total / limit), // Ensure you're sending the correct total pages
//       });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find({});
    console.log(customers); 
    return res.status(200).json({ success: true, customers });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

module.exports = {
  getCustomers,
};
