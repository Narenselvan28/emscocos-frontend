import React, { useEffect, useState } from "react";

function SearchableDropdown({ options, value, onChange, placeholder, disabled }) {
    return (
        <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded p-1 w-full"
            disabled={disabled}
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
    setTableRows
}) {
    const [editMode, setEditMode] = useState(false);
    const [history, setHistory] = useState([]);

    // Save current state to history
    const handleChange = (idx, key, value) => {
        setHistory((prev) => [...prev, JSON.parse(JSON.stringify(tableRows))]);
        updateRow(idx, key, value);
    };

    // Handle Undo (Ctrl + Z)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "z" && history.length > 0) {
                e.preventDefault();
                const prev = [...history];
                const lastState = prev.pop();
                setHistory(prev);
                setTableRows(lastState);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [history, tableRows]);

    const handleDelete = (idx) => {
        const updated = tableRows.filter((_, i) => i !== idx);
        setTableRows(updated);
    };

    return (
        <div className="h-80">
            <div className="flex justify-end mb-2 space-x-2">
                {!editMode ? (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit Table
                    </button>
                ) : (
                    <button
                        onClick={() => setEditMode(false)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Done Editing
                    </button>
                )}
            </div>

            <table className="min-w-full border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Item Name</th>
                        <th className="border p-2">UOM</th>
                        <th className="border p-2">Qty</th>
                        <th className="border p-2">Rate</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Debit/Credit</th>
                        {editMode && <th className="border p-2">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {tableRows.map((row, idx) => (
                        <tr key={idx}>
                            <td className="border p-1">
                                <SearchableDropdown
                                    options={itemNameOptions}
                                    value={row.itemName}
                                    onChange={(val) => handleChange(idx, "itemName", val)}
                                    placeholder="Select Item"
                                    disabled={!editMode}
                                />
                            </td>
                            <td className="border p-1">
                                <SearchableDropdown
                                    options={uomOptions}
                                    value={row.uom}
                                    onChange={(val) => handleChange(idx, "uom", val)}
                                    placeholder="Select UOM"
                                    disabled={!editMode}
                                />
                            </td>
                            <td className="border p-1">
                                <input
                                    type="number"
                                    className="w-full p-1 border rounded"
                                    value={row.qty}
                                    onChange={(e) => handleChange(idx, "qty", e.target.value)}
                                    disabled={!editMode}
                                />
                            </td>
                            <td className="border p-1">
                                <input
                                    type="number"
                                    className="w-full p-1 border rounded"
                                    value={row.rate}
                                    onChange={(e) => handleChange(idx, "rate", e.target.value)}
                                    disabled={!editMode}
                                />
                            </td>
                            <td className="border p-1">
                                <input
                                    type="number"
                                    className="w-full p-1 border rounded"
                                    value={row.price}
                                    onChange={(e) => handleChange(idx, "price", e.target.value)}
                                    disabled={!editMode}
                                />
                            </td>
                            <td className="border p-1">
                                <SearchableDropdown
                                    options={debitCreditOptions}
                                    value={row.debitCredit}
                                    onChange={(val) => handleChange(idx, "debitCredit", val)}
                                    placeholder="Select"
                                    disabled={!editMode}
                                />
                            </td>
                            {editMode && (
                                <td className="border p-1 text-center">
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {editMode && (
                <button
                    onClick={() => {
                        setHistory((prev) => [...prev, JSON.parse(JSON.stringify(tableRows))]);
                        addRow();
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Row
                </button>
            )}
        </div>
    );
}
