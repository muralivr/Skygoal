import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:8081/api/getcustomers",
        {
          params: {
            page,
            search: search || "", // Default to empty string
            filterField: filterField || "", // Default to empty string
            filterValue: filterValue || "", // Default to empty string
          },
        }
      );
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch customers.");
      console.error("Error fetching customers:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, search, filterField, filterValue]);

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name, email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/3"
        />

        {/* Filter Dropdown */}
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Filter by Field</option>
          <option value="name_of_customer">Name</option>
          <option value="email">Email</option>
          <option value="mobile_number">Mobile Number</option>
        </select>

        <input
          type="text"
          placeholder="Enter filter value"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Reset Filters Button */}
      <div className="mb-4">
        <button
          onClick={() => {
            setFilterField("");
            setFilterValue("");
            setSearch("");
            setPage(1);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Reset Filters
        </button>
      </div>

      {/* Customer Table */}
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Mobile Number
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  DOB
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="border-t">
                  <td className="py-3 px-4 text-sm">
                    {customer.name_of_customer}
                  </td>
                  <td className="py-3 px-4 text-sm">{customer.email}</td>
                  <td className="py-3 px-4 text-sm">
                    {customer.mobile_number}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(customer.dob).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerTable;
