import { streamSalesRows } from "../utils/loadData.js";

const stringIncludes = (value, search) => {
  if (!search) return true;
  if (!value) return false;
  return value.toString().toLowerCase().includes(search.toLowerCase());
};

const applyFilters = (row, search, filters) => {
  // Search on name or phone
  if (search) {
    const matchName = stringIncludes(row.customerName, search);
    const matchPhone = stringIncludes(row.phoneNumber, search);
    if (!matchName && !matchPhone) return false;
  }

  // Region
  if (filters.customerRegions?.length) {
    const v = (row.customerRegion || "").toLowerCase();
    const allowed = filters.customerRegions.map((r) => r.toLowerCase());
    if (!allowed.includes(v)) return false;
  }

  // Gender
  if (filters.genders?.length) {
    const v = (row.gender || "").toLowerCase();
    const allowed = filters.genders.map((r) => r.toLowerCase());
    if (!allowed.includes(v)) return false;
  }

  // Age range
  if (filters.ageMin !== undefined && filters.ageMin !== "") {
    if (row.age == null || row.age < filters.ageMin) return false;
  }
  if (filters.ageMax !== undefined && filters.ageMax !== "") {
    if (row.age == null || row.age > filters.ageMax) return false;
  }

  // Product category
  if (filters.productCategories?.length) {
    const v = (row.productCategory || "").toLowerCase();
    const allowed = filters.productCategories.map((r) => r.toLowerCase());
    if (!allowed.includes(v)) return false;
  }

  // Tags (any tag must match)
  if (filters.tags?.length) {
    const wanted = filters.tags.map((t) => t.toLowerCase());
    const rowTags = (row.tags || []).map((t) => t.toLowerCase());
    const has = wanted.some((t) => rowTags.includes(t));
    if (!has) return false;
  }

  // Payment method (case-insensitive, tolerant)
  if (filters.paymentMethods?.length) {
    const itemValue = (row.paymentMethod || "").toLowerCase();
    const allowed = filters.paymentMethods.map((v) => v.toLowerCase());
    const matches = allowed.some((v) => itemValue.includes(v));
    if (!matches) return false;
  }

  // Date range
  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom);
    if (!row.date || row.date < from) return false;
  }
  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    if (!row.date || row.date > to) return false;
  }

  return true;
};

const baseCompare = (a, b, sortBy) => {
  if (sortBy === "customerName") {
    const av = (a.customerName || "").toLowerCase();
    const bv = (b.customerName || "").toLowerCase();
    return av.localeCompare(bv);
  }

  if (sortBy === "quantity") {
    const av = a.quantity || 0;
    const bv = b.quantity || 0;
    return av - bv;
  }

  // default: date
  if (sortBy === "date") {
    const av = a.date ? a.date.getTime() : 0;
    const bv = b.date ? b.date.getTime() : 0;
    return av - bv;
  }

  return 0;
};

export const fetchSales = async ({
  search,
  sortBy,
  sortOrder,
  page,
  pageSize,
  filters,
}) => {
  const maxItems = page * pageSize; // we only keep top N for requested page
  const buffer = [];
  let totalMatches = 0;

  const cmpAsc = (a, b) => baseCompare(a, b, sortBy);
  const compare =
    sortOrder === "asc" ? cmpAsc : (a, b) => -cmpAsc(a, b);

  await streamSalesRows((row) => {
    if (!applyFilters(row, search, filters)) return;

    totalMatches += 1;

    buffer.push(row);
    buffer.sort(compare); // buffer is small (maxItems), so this is fine

    if (buffer.length > maxItems) {
      // drop the worst one (last) according to current sort order
      buffer.pop();
    }
  });

  const totalPages = Math.max(1, Math.ceil(totalMatches / pageSize));

  // buffer now has top (page * pageSize) rows in correct order
  const startIndex = Math.max(0, (page - 1) * pageSize);
  const data = buffer.slice(startIndex, startIndex + pageSize);

  return {
    page,
    pageSize,
    total: totalMatches,
    totalPages,
    data,
  };
};
