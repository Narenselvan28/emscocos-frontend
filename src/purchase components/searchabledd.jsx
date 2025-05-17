import React, { useState, useEffect, useRef } from "react";

function SearchableDropdown({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder,
}) {
  const [search, setSearch] = useState(value || "");
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    setSearch(val);
    onChange(val);
    setShowOptions(false);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    onChange(e.target.value);
    setShowOptions(true);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e) => {
    if (!showOptions || disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowOptions(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label
          className={`block mb-2 font-semibold ${disabled ? "opacity-50" : ""
            }`}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        onFocus={() => !disabled && setShowOptions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || `Select or type ${label?.toLowerCase()}`}
        className={`border p-3 rounded w-full text-base focus:outline-none ${disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "focus:ring-2 focus:ring-blue-500"
          }`}
        disabled={disabled}
      />
      {!disabled && showOptions && (
        <ul className="absolute z-10 w-full max-h-48 overflow-y-auto border border-gray-300 bg-white rounded shadow-lg mt-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <li
                key={idx}
                onMouseDown={() => handleSelect(opt)}
                className={`px-4 py-2 cursor-pointer ${highlightedIndex === idx ? "bg-blue-100" : "hover:bg-blue-100"
                  }`}
              >
                {opt}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 select-none">
              No options found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}


export default SearchableDropdown;