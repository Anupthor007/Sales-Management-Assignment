import fs from "fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];

// Map CSV row -> normalized JS object
const normalizeRow = (row) => {
  return {
    transactionId: row["Transaction ID"],
    customerId: row["Customer ID"],
    customerName: row["Customer Name"],
    phoneNumber: row["Phone Number"],
    gender: row["Gender"],
    age: row["Age"] ? Number(row["Age"]) : null,
    customerRegion: row["Customer Region"],
    customerType: row["Customer Type"],

    productId: row["Product ID"],
    productName: row["Product Name"],
    brand: row["Brand"],
    productCategory: row["Product Category"],

    // "smart,wireless" -> ["smart", "wireless"]
    tags: row["Tags"]
      ? row["Tags"].split(",").map((t) => t.trim()).filter(Boolean)
      : [],

    quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
    pricePerUnit: row["Price per Unit"] ? Number(row["Price per Unit"]) : 0,
    discountPercentage: row["Discount Percentage"]
      ? Number(row["Discount Percentage"])
      : 0,
    totalAmount: row["Total Amount"] ? Number(row["Total Amount"]) : 0,
    finalAmount: row["Final Amount"] ? Number(row["Final Amount"]) : 0,

    date: row["Date"] ? new Date(row["Date"]) : null,
    paymentMethod: row["Payment Method"],
    orderStatus: row["Order Status"],
    deliveryType: row["Delivery Type"],
    storeId: row["Store ID"],
    storeLocation: row["Store Location"],
    salespersonId: row["Salesperson ID"],
    employeeName: row["Employee Name"],
  };
};

export const loadSalesData = async () => {
  const csvPath = path.join(__dirname, "..", "..", "data", "sales.csv");

  if (!fs.existsSync(csvPath)) {
    console.error("❌ sales.csv not found at:", csvPath);
    salesData = [];
    return;
  }

  const fileStream = fs.createReadStream(csvPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let headers = [];
  let isFirstLine = true;
  salesData = [];

  for await (const line of rl) {
    if (!line.trim()) continue;

    if (isFirstLine) {
      headers = line.split(",").map((h) => h.trim());
      isFirstLine = false;
      continue;
    }

    const values = line.split(",");
    const rowObj = {};
    headers.forEach((header, idx) => {
      rowObj[header] = (values[idx] ?? "").trim(); // <-- trim values
    });

    salesData.push(normalizeRow(rowObj));
  }

  console.log(`✅ Loaded ${salesData.length} sales records from CSV`);
};

export const getSalesData = () => salesData;
