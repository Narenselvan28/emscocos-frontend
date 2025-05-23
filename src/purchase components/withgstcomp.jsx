import React from "react";

function SearchableDropdown({ options, value, onChange, placeholder }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-1 w-full"
    >
      <option value="">{placeholder}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function WithGSTComp({
  tableRows,
  updateRow,
  itemNameOptions,
  uomOptions,
  debitCreditOptions,
  addRow,
}) {
  return (
    <div className="h-80 bg-white ">
      <table className="min-w-full border  border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item Name</th>
            <th className="border p-2">UOM</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">SGST %</th>
            <th className="border p-2">SGST Value</th>
            <th className="border p-2">CGST %</th>
            <th className="border p-2">CGST Value</th>
            <th className="border p-2">Grand Total</th>
            <th className="border p-2">Debit/Credit</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, idx) => (
            <tr key={idx} className="bg-gray-50">
              <td className="border p-1">
                <SearchableDropdown
                  options={itemNameOptions}
                  value={row.itemName}
                  onChange={(val) => updateRow(idx, "itemName", val)}
                  placeholder="Select Item"
                />
              </td>
              <td className="border p-1">
                <SearchableDropdown
                  options={uomOptions}
                  value={row.uom}
                  onChange={(val) => updateRow(idx, "uom", val)}
                  placeholder="Select UOM"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded"
                  value={row.qty}
                  onChange={(e) => updateRow(idx, "qty", e.target.value)}
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded"
                  value={row.rate}
                  onChange={(e) => updateRow(idx, "rate", e.target.value)}
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded"
                  value={row.price}
                  onChange={(e) => updateRow(idx, "price", e.target.value)}
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded"
                  value={row.sgst}
                  onChange={(e) => updateRow(idx, "sgst", e.target.value)}
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded bg-gray-100"
                  value={row.sgstValue}
                  readOnly
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded"
                  value={row.cgst}
                  onChange={(e) => updateRow(idx, "cgst", e.target.value)}
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded bg-gray-100"
                  value={row.cgstValue}
                  readOnly
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  className="w-full p-1 border rounded bg-gray-100"
                  value={row.grandTotal}
                  readOnly
                />
              </td>
              <td className="border p-1">
                <SearchableDropdown
                  options={debitCreditOptions}
                  value={row.debitCredit}
                  onChange={(val) => updateRow(idx, "debitCredit", val)}
                  placeholder="Select"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
}
