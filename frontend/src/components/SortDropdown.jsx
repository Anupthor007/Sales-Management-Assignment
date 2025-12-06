import React from "react";

export const SortDropdown = ({ sortBy, sortOrder, onChange }) => {
  const handleSortFieldChange = (e) => {
    const value = e.target.value;
    let defaultOrder = "asc";
    if (value === "date") defaultOrder = "desc";
    onChange(value, defaultOrder);
  };

  const handleOrderChange = (e) => {
    onChange(sortBy, e.target.value);
  };

  return (
    <div className="sort-wrapper">
      <span className="sort-label">Sort by:</span>
      <select
        className="sort-select"
        value={sortBy}
        onChange={handleSortFieldChange}
      >
        <option value="customerName">Customer Name</option>
        <option value="date">Date</option>
        <option value="quantity">Quantity</option>
      </select>
      <select
        className="sort-select sort-order-select"
        value={sortOrder}
        onChange={handleOrderChange}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
};
