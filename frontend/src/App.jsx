import React from "react";
import { SalesDashboard } from "./pages/SalesDashboard.jsx";
import { Sidebar } from "./components/Sidebar.jsx";

const App = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main-area">
        <header className="app-topbar">
          <h1 className="page-title">Sales Management System</h1>
        </header>
        <SalesDashboard />
      </div>
    </div>
  );
};

export default App;
