import React from "react";
import CustomerTable from "./components/CustomerTable";

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Customer Management
      </h1>
      <CustomerTable />
    </div>
  );
}

export default App;
