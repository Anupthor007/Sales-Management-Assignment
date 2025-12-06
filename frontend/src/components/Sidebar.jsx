import React from "react";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
<div className="sidebar-logo-circle">T</div>
        <div>
          <div className="sidebar-appname">Vault</div>
          <div className="sidebar-username">Anup Thorat</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <div className="sidebar-section-title">Main</div>
          <button className="sidebar-item sidebar-item-active">Dashboard</button>
          <button className="sidebar-item">Nexus</button>
          <button className="sidebar-item">Intake</button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Services</div>
          <button className="sidebar-item">Pre-active</button>
          <button className="sidebar-item">Active</button>
          <button className="sidebar-item">Blocked</button>
          <button className="sidebar-item">Closed</button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Invoices</div>
          <button className="sidebar-item sidebar-item-sub-active">
            Proforma Invoices
          </button>
          <button className="sidebar-item">Final Invoices</button>
        </div>
      </nav>
    </aside>
  );
};
