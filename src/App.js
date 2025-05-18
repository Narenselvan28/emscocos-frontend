import React, { useState, useEffect } from "react";
import GstComp from "./purchase components/gstcomp";
import SearchableDropdown from "./purchase components/searchabledd";
import SundryDetails from "./purchase components/sundry.jsx";

const orderTypeOptions = ["Purchase", "Sale"];
const partyOptions = ["Ems cocos", "APA Rasu", "Anand SOK"];
const brokerOptions = ["Ems cocos", "APA Rasu", "Anand SOK"];
const itemNameOptions = ["-", "Coconut with Husk", "Coconut without Husk", "Copra", "Husk"];
const uomOptions = ["-", "Nos", "gms", "Quintal"];
const debitCreditOptions = ["-", "Debit", "Credit"];
const sundryCategoryOptions = ["-", "Gunny Bags", "Loading Charges", "Roundoff (+)", "Roundoff (-)"];

function ExcelEntryForm() {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [orderType, setOrderType] = useState("");
  const [partyName, setPartyName] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [useGst, setUseGst] = useState(false);

  const [showSundry, setShowSundry] = useState(false);
  const [sundryCategory, setSundryCategory] = useState("");
  const [sundryValue, setSundryValue] = useState("");
  const [sundryRemarks, setSundryRemarks] = useState("");

  useEffect(() => {
    setTableRows([{ itemName: "", uom: "", qty: "", price: "", debitCredit: "" }]);
  }, []);

  const addRow = () => {
    setTableRows([...tableRows, { itemName: "", uom: "", qty: "", price: "", debitCredit: "" }]);
  };

  const updateRow = (index, key, value) => {
    const updatedRows = [...tableRows];
    updatedRows[index][key] = value;
    setTableRows(updatedRows);
  };

  const resetForm = () => {
    setDate(() => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    });
    setOrderType("");
    setPartyName("");
    setBrokerName("");
    setTableRows([{ itemName: "", uom: "", qty: "", price: "", debitCredit: "" }]);
    setUseGst(false);
    setShowSundry(false);
    setSundryCategory("");
    setSundryValue("");
    setSundryRemarks("");
  };

  const handleSave = () => {
    const formData = {
      date,
      orderType,
      partyName,
      brokerName,
      items: tableRows,
      gstEnabled: useGst,
      sundryDetails: showSundry
        ? {
          sundryCategory,
          sundryValue,
          sundryRemarks,
        }
        : null,
    };

    console.log("Form Data:", formData);
    alert("Data saved! Check console for output.");
  };

  return (
    <div className="bg-gray-100 p-10 text-base font-[Poppins]">
      <div className="max-w-full">
        <h1 className="text-3xl font-semibold mb-8">Purchase / Sales</h1>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 bg-white p-6 rounded shadow-md">
          <div>
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              className="border p-3 rounded w-full text-base"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <SearchableDropdown
            label="Order Type"
            options={orderTypeOptions}
            value={orderType}
            onChange={setOrderType}
            placeholder="Select or type order type"
          />
          <SearchableDropdown
            label="Party Name"
            options={partyOptions}
            value={partyName}
            onChange={setPartyName}
            placeholder="Select or type party name"
          />
          <SearchableDropdown
            label="Broker Name"
            options={brokerOptions}
            value={brokerName}
            onChange={setBrokerName}
            placeholder="Select or type broker name"
          />
        </div>

        {/* GST Toggle */}
        <div className="mb-6">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useGst}
              onChange={(e) => setUseGst(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-base font-medium">Enable GST Table</span>
          </label>
        </div>

        {/* Main Table */}
        <div className="mb-8">
          {useGst ? (
            <GstComp
              tableRows={tableRows}
              updateRow={updateRow}
              itemNameOptions={itemNameOptions}
              uomOptions={uomOptions}
              debitCreditOptions={debitCreditOptions}
              addRow={addRow}
            />
          ) : (
            <div className="overflow-x-auto h-80 border rounded shadow-sm bg-white">
              <table className="table-auto border-collapse w-full text-base">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-4 py-3">Item Name</th>
                    <th className="border px-4 py-3">UOM</th>
                    <th className="border px-4 py-3">Qty</th>
                    <th className="border px-4 py-3">Price</th>
                    <th className="border px-4 py-3">Debit/Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 w-64">
                        <SearchableDropdown
                          label=""
                          options={itemNameOptions}
                          value={row.itemName}
                          onChange={(val) => updateRow(index, "itemName", val)}
                          placeholder="Item name"
                        />
                      </td>
                      <td className="border px-4 py-2 w-24">
                        <SearchableDropdown
                          label=""
                          options={uomOptions}
                          value={row.uom}
                          onChange={(val) => updateRow(index, "uom", val)}
                          placeholder="UOM"
                        />
                      </td>
                      <td className="border px-4 py-2 w-24">
                        <input
                          type="number"
                          className="border p-2 rounded w-full"
                          placeholder="Qty"
                          value={row.qty}
                          onChange={(e) => updateRow(index, "qty", e.target.value)}
                        />
                      </td>
                      <td className="border px-4 py-2 w-24">
                        <input
                          type="number"
                          className="border p-2 rounded w-full"
                          placeholder="Price"
                          value={row.price}
                          onChange={(e) => updateRow(index, "price", e.target.value)}
                        />
                      </td>
                      <td className="border px-4 py-2 w-28">
                        <SearchableDropdown
                          label=""
                          options={debitCreditOptions}
                          value={row.debitCredit}
                          onChange={(val) => updateRow(index, "debitCredit", val)}
                          placeholder="Debit/Credit"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
<div>
    

</div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={addRow}
          >
            + Add Row
          </button>
          <button
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={resetForm}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save Sheets
          </button>
        </div>
      </div>
           <SundryDetails/>

    </div>
  );
}

export default ExcelEntryForm;
