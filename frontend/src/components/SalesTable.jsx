import React from "react";

export const SalesTable = ({ rows }) => {
  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.transactionId}</td>
              <td>
                {row.date ? new Date(row.date).toISOString().slice(0, 10) : ""}
              </td>
              <td>{row.customerId}</td>
              <td>{row.customerName}</td>
              <td>{row.phoneNumber}</td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td>{row.productCategory}</td>
              <td className="col-right">
                {row.quantity?.toString().padStart(2, "0")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
