const CustomerModel = require("../models/Customer.js");

// Controller to fetch customers with pagination, search, and filtering
const getCustomers = async (req, res) => {
  try {
    const {
      page = 1, // Default to page 1 if not provided
      limit = 10, // Default to 10 results per page if not provided
      search = "", // Default to an empty search string
      filterField = "", // Default to no filter field
      filterValue = "", // Default to no filter value
    } = req.query;

    // Constructing the query object
    const query = {};

    // Search logic for name_of_customer and email fields
    if (search.trim()) {
      query.$or = [
        { name_of_customer: { $regex: search, $options: "i" } }, // Case-insensitive search
        { email: { $regex: search, $options: "i" } }, // Case-insensitive search
      ];
    }

    // Filter logic for a specific field
    if (filterField && filterValue) {
      query[filterField] = filterValue;
    }

    // Pagination logic
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    // Fetch customers based on query, skip, and limit
    const customers = await CustomerModel.find(query)
      .skip(skip)
      .limit(parseInt(limit, 10));

    // Total count of matching documents
    const total = await CustomerModel.countDocuments(query);

    // Respond with the data
    return res.status(200).json({
      customers,
      totalPages: Math.ceil(total / parseInt(limit, 10)),
      totalCustomers: total, // Optional: Include total customers for reference
    });
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching customers." });
  }
};

module.exports = {
  getCustomers,
};
