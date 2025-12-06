import React from "react";

const formatCurrency = (value) => {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const MetricsBar = ({ rows }) => {
  const totalUnits = rows.reduce((sum, r) => sum + toNumber(r.quantity), 0);
  const totalAmount = rows.reduce(
    (sum, r) => sum + toNumber(r.finalAmount),
    0
  );
  const totalDiscount = rows.reduce(
    (sum, r) =>
      sum + (toNumber(r.totalAmount) - toNumber(r.finalAmount)),
    0
  );

  return (
    <div className="metrics-bar">
      <div className="metric-card">
        <div className="metric-label">Total units sold</div>
        <div className="metric-value">{totalUnits}</div>
      </div>

      <div className="metric-card">
        <div className="metric-label">Total Amount</div>
        <div className="metric-value">{formatCurrency(totalAmount)}</div>
      </div>

      <div className="metric-card">
        <div className="metric-label">Total Discount</div>
        <div className="metric-value">{formatCurrency(totalDiscount)}</div>
      </div>
    </div>
  );
};
