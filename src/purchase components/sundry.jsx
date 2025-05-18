import React, { useState } from "react";

export default function SundryDetails() {
  const [showSundry, setShowSundry] = useState(false);
  const [category, setCategory] = useState("-");
  const [value, setValue] = useState("");
  const [remarks, setRemarks] = useState("");

  const toggleSundryDetails = () => {
    setShowSundry(!showSundry);
    if (showSundry) {
      setCategory("-");
      setValue("");
      setRemarks("");
    }
  };

  const saveAndNext = () => {
    console.log("Sundry Details:", { category, value, remarks });
    alert("Saved & Next clicked! Check console.");
  };

  return (
    <div className="max-w-9xl mx-auto p-6">
      {/* Checkbox for Sundry Details */}
      <div className="mt-8 flex items-center gap-3">
        <input
          type="checkbox"
          id="toggleSundry"
          className="w-5 h-5"
          checked={showSundry}
          onChange={toggleSundryDetails}
        />
        <label htmlFor="toggleSundry" className="text-lg font-semibold">
          Add Sundry Details
        </label>
      </div>

      {/* Sundry Details Section */}
      <div
        className={`mt-6 p-6 bg-gray-50 border rounded-lg shadow-md transition-opacity duration-300 ${
          showSundry ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Sundry Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              className="border p-2 rounded w-full"
              disabled={!showSundry}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>-</option>
              <option>Gunny Bags</option>
              <option>Loading Charges</option>
              <option>Roundoff (+)</option>
              <option>Roundoff (-)</option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="block mb-2 font-medium">Value</label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              placeholder="Enter Value"
              disabled={!showSundry}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block mb-2 font-medium">Remarks</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Remarks"
              disabled={!showSundry}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={saveAndNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-base"
        >
          Save & Next
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-base">
          Save & New
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-base">
          Save All
        </button>
      </div>
    </div>
  );
}
