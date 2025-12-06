import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { FilterBar } from "../components/FilterBar.jsx";
import { SortDropdown } from "../components/SortDropdown.jsx";
import { MetricsBar } from "../components/MetricsBar.jsx";
import { SalesTable } from "../components/SalesTable.jsx";
import { PaginationControls } from "../components/PaginationControls.jsx";
import { useSalesQuery } from "../hooks/useSalesQuery.js";

const initialFilters = {
  customerRegions: [],
  genders: [],
  ageMin: "",
  ageMax: "",
  productCategories: [],
  tags: [],
  paymentMethods: [],
  dateFrom: "",
  dateTo: "",
  datePreset: "All",
};

export const SalesDashboard = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("customerName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const { data, isLoading, error } = useSalesQuery({
    search,
    sortBy,
    sortOrder,
    page,
    filters,
  });

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFiltersChange = (updated) => {
    setFilters(updated);
    setPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setPage(1);
  };

  const handlePrev = () => {
    if (!data) return;
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (!data) return;
    if (page < data.totalPages) setPage((p) => p + 1);
  };

  const handleReset = () => {
    setSearch("");
    setSortBy("customerName");
    setSortOrder("asc");
    setPage(1);
    setFilters(initialFilters);
  };

  const rows = data?.data || [];

  return (
    <div className="dashboard-layout">
      {/* Top row: filters + search + sort */}
      <div className="dashboard-top-row">
        <div className="top-left">
          <button
            className="refresh-icon"
            type="button"
            onClick={handleReset}
            title="Reset filters"
          >
            ⟳
          </button>
          <FilterBar filters={filters} onChange={handleFiltersChange} />
        </div>
        <div className="top-right">
          <SearchBar value={search} onChange={handleSearchChange} />
          <SortDropdown
            sortBy={sortBy}
            sortOrder={sortOrder}
            onChange={handleSortChange}
          />
        </div>
      </div>

      {/* Metrics */}
      <MetricsBar rows={rows} />

      {/* Table & pagination */}
      <div className="table-card">
        {isLoading && <div className="state-info">Loading...</div>}
        {error && (
          <div className="state-info error">
            Something went wrong. Please try again.
          </div>
        )}
        {!isLoading && !error && rows.length === 0 && (
          <div className="state-info">No transactions found.</div>
        )}
        {!isLoading && !error && rows.length > 0 && (
          <>
            <SalesTable rows={rows} />
            <PaginationControls
              page={data.page}
              totalPages={data.totalPages}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </>
        )}
      </div>
    </div>
  );
};
