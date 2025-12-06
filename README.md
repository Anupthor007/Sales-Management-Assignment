# Sales Management Dashboard

> **Note:**  
> This assignment is deployed publicly at **https://truestate.netlify.app/**.  
> When opening the dashboard for evaluation, the data may take a few seconds to load.  
> This is because the backend i hosted it on render free tier which goes into "sleep mode" when inactive, and must wake up before serving the first request. After the first load, performance remains smooth.

---

## 1. Overview
This project is a full-stack Sales Management Dashboard designed to explore, filter, and analyze sales records from a large CSV dataset.  
The goal was to build a clean, intuitive UI and an efficient backend that can handle large data without loading everything into memory.  
The application supports dynamic search, multi-layered filtering, sorting, and pagination with smooth user experience.  
The frontend communicates with the backend through REST APIs.

---

## 2. Tech Stack

### **Frontend**
- React (Vite)
- JavaScript (ES6+)
- Axios for API communication
- Custom CSS (with light glass-effect styling)

### **Backend**
- Node.js + Express
- CSV streaming via `readline` (memory-efficient)
- Deployed on Render

### **Deployment Tools**
- **Netlify** — frontend hosting  
- **Render** — backend hosting  
- **GitHub** — version control and CI deploy triggers

---

## 3. Search Implementation Summary
The search functionality allows users to find records through **Customer Name** or **Phone Number**.  
The frontend sends a `search` query parameter, and the backend filters matching rows *during the CSV stream itself*.  
This avoids loading the full dataset into memory while still providing fast, accurate results.  
The search is case-insensitive and supports partial matches.

---

## 4. Filter Implementation Summary
All filters in the dashboard work together and update results in real time. Supported filters include:
- Customer Region  
- Gender  
- Age Range  
- Product Category  
- Tags  
- Payment Method  
- Date (year-based)

The frontend constructs a query string with all active filters.  
The backend evaluates each filter while streaming each CSV row so only matching rows are processed further.  
This ensures efficiency even with large datasets.

---

## 5. Sorting Implementation Summary
Sorting is available on:
- **Date**
- **Customer Name**
- **Quantity**

The backend receives `sortBy` and `sortOrder` and maintains only the top `page * pageSize` rows required for the current request.  
This memory-optimized approach avoids fully sorting the entire dataset and works efficiently with large files.

---

## 6. Pagination Implementation Summary
Pagination is handled entirely on the backend to ensure scalability.  
The backend:
1. Streams the CSV  
2. Applies search + filter rules  
3. Maintains a small sorted buffer of only required rows  
4. Returns a paginated slice

Each response contains:
- `page`
- `pageSize`
- `total` (matching records)
- `totalPages`
- `data` (current page results)

This allows smooth navigation without heavy memory usage.

---

## 7. Setup Instructions

### **Backend & Frontend Setup**


```bash
cd backend
npm install
npm start



cd frontend
npm install
npm run dev
