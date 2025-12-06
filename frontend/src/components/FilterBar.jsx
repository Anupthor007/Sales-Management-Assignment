import React from "react";

// Dataset regions
const regions = ["All", "North", "South", "East", "West", "Central"];

// From sheet
const genders = ["All", "Male", "Female", "Other"];

const ageRanges = [
  { label: "All", min: "", max: "" },
  { label: "18-25", min: 18, max: 25 },
  { label: "26-35", min: 26, max: 35 },
  { label: "36-45", min: 36, max: 45 },
  { label: "46+", min: 46, max: "" },
];

// Product Category from your screenshot
const productCategories = ["All", "Beauty", "Electronics", "Clothing"];

// Common atomic tags (your screenshot shows combinations of these)
const tags = [
  "All",
  "smart",
  "wireless",
  "gadgets",
  "makeup",
  "fragrance-free",
  "beauty",
  "skincare",
  "organic",
  "portable",
  "unisex",
  "cotton",
  "fashion",
  "accessories",
];

// Payment methods from dataset
const paymentMethods = [
  "All",
  "Cash",
  "UPI",
  "Net Banking",
  "Wallet",
  "Debit Card",
  "Credit Card",
];

// Year-based presets
const datePresets = [
  { label: "All", type: "all" },
  { label: "2021", type: "year", year: 2021 },
  { label: "2022", type: "year", year: 2022 },
  { label: "2023", type: "year", year: 2023 },
];

export const FilterBar = ({ filters, onChange }) => {
  const handleRegionChange = (e) => {
    const value = e.target.value;
    onChange({
      ...filters,
      customerRegions: value === "All" ? [] : [value],
    });
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    onChange({
      ...filters,
      genders: value === "All" ? [] : [value],
    });
  };

  const handleAgeRangeChange = (e) => {
    const selected = ageRanges.find((r) => r.label === e.target.value);
    onChange({
      ...filters,
      ageMin: selected?.min ?? "",
      ageMax: selected?.max ?? "",
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    onChange({
      ...filters,
      productCategories: value === "All" ? [] : [value],
    });
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    onChange({
      ...filters,
      tags: value === "All" ? [] : [value],
    });
  };

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    onChange({
      ...filters,
      paymentMethods: value === "All" ? [] : [value],
    });
  };

  const handleDatePresetChange = (e) => {
    const label = e.target.value;
    const preset = datePresets.find((d) => d.label === label);

    if (!preset || preset.type === "all") {
      onChange({
        ...filters,
        datePreset: "All",
        dateFrom: "",
        dateTo: "",
      });
      return;
    }

    const from = new Date(preset.year, 0, 1);     // Jan 1
    const to = new Date(preset.year, 11, 31);     // Dec 31

    const fmt = (d) => d.toISOString().slice(0, 10);

    onChange({
      ...filters,
      datePreset: preset.label,
      dateFrom: fmt(from),
      dateTo: fmt(to),
    });
  };

  const currentAgeLabel =
    ageRanges.find(
      (a) =>
        String(a.min || "") === String(filters.ageMin || "") &&
        String(a.max || "") === String(filters.ageMax || "")
    )?.label || "All";

  const currentDatePreset = filters.datePreset || "All";

  return (
    <div className="filter-bar">
      <div className="filter-pill">
        <span className="pill-label">Customer Region</span>
        <select
          className="pill-select"
          value={filters.customerRegions[0] || "All"}
          onChange={handleRegionChange}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-pill">
        <span className="pill-label">Gender</span>
        <select
          className="pill-select"
          value={filters.genders[0] || "All"}
          onChange={handleGenderChange}
        >
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-pill">
        <span className="pill-label">Age Range</span>
        <select
          className="pill-select"
          onChange={handleAgeRangeChange}
          value={currentAgeLabel}
        >
          {ageRanges.map((a) => (
            <option key={a.label} value={a.label}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-pill">
        <span className="pill-label">Product Category</span>
        <select
          className="pill-select"
          value={filters.productCategories[0] || "All"}
          onChange={handleCategoryChange}
        >
          {productCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-pill">
        <span className="pill-label">Tags</span>
        <select
          className="pill-select"
          value={filters.tags[0] || "All"}
          onChange={handleTagsChange}
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-pill">
        <span className="pill-label">Payment Method</span>
        <select
          className="pill-select"
          value={filters.paymentMethods[0] || "All"}
          onChange={handlePaymentMethodChange}
        >
          {paymentMethods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-pill">
        <span className="pill-label">Date</span>
        <select
          className="pill-select"
          value={currentDatePreset}
          onChange={handleDatePresetChange}
        >
          {datePresets.map((d) => (
            <option key={d.label} value={d.label}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
