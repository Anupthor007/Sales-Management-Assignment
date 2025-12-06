import React from "react";

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Name, Phone no."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
