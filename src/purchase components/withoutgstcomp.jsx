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

export default function WithoutGSTComp({
    tableRows,
    updateRow,
    itemNameOptions,
    uomOptions,
    debitCreditOptions,
    addRow,
}) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Without GST Entries</h2>
            <table className="min-w-full border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Item Name</th>
                        <th className="border p-2">UOM</th>
                        <th className="border p-2">Qty</th>
                        <th className="border p-2">Rate</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Debit/Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows.map((row, idx) => (
                        <tr key={idx}>
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
