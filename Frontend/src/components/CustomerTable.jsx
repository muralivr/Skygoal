import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/getcustomers');
  
      console.log(response); // Log the full response to check if it's in the expected structure
  
      setCustomers(response.data.customers); // This should be 'customers'
      setTotalPages(response.data.totalPages); // This should be 'totalPages'
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  

  useEffect(() => {
    fetchCustomers();
  }, [page, search, filterField, filterValue]);

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/3"
        />
      </div>

      {/* Customer Table */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Mobile Number</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">DOB</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.s_no} className="border-t">
              <td className="py-3 px-4 text-sm">{customer.name_of_customer}</td>
              <td className="py-3 px-4 text-sm">{customer.email}</td>
              <td className="py-3 px-4 text-sm">{customer.mobile_number}</td>
              <td className="py-3 px-4 text-sm">{new Date(customer.dob).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
