import { findAllSales } from "../models/saleModel.js";

const applySearch = (data, search) => {
  if (!search) return data;
  const term = search.toLowerCase();
  return data.filter((item) => {
    const name = (item.customerName || "").toLowerCase();
    const phone = (item.phoneNumber || "").toLowerCase();
    return name.includes(term) || phone.includes(term);
  });
};

const applyFilters = (data, filters) => {
  return data.filter((item) => {
    if (filters.customerRegions?.length) {
      if (!filters.customerRegions.includes(item.customerRegion)) return false;
    }

    if (filters.genders?.length) {
      if (!filters.genders.includes(item.gender)) return false;
    }

    if (filters.ageMin !== null || filters.ageMax !== null) {
      const age = item.age;
      if (age === null) return false;

      if (filters.ageMin !== null && age < filters.ageMin) return false;
      if (filters.ageMax !== null && age > filters.ageMax) return false;
    }

    if (filters.productCategories?.length) {
      if (!filters.productCategories.includes(item.productCategory))
        return false;
    }

    if (filters.tags?.length) {
      const itemTags = item.tags || [];
      const hasMatch = filters.tags.some((tag) => itemTags.includes(tag));
      if (!hasMatch) return false;
    }

      if (filters.paymentMethods?.length) {
      const itemValue = (item.paymentMethod || "").toLowerCase();
      const allowed = filters.paymentMethods.map((v) => v.toLowerCase());
      const matches = allowed.some((v) => itemValue.includes(v));
      if (!matches) return false;
    }


    if (filters.dateFrom || filters.dateTo) {
      if (!item.date) return false;
      const time = item.date.getTime();

      if (filters.dateFrom) {
        const fromTime = filters.dateFrom.getTime();
        if (time < fromTime) return false;
      }
      if (filters.dateTo) {
        const toTime = filters.dateTo.getTime();
        if (time > toTime) return false;
      }
    }

    return true;
  });
};

const applySorting = (data, sortBy, sortOrder) => {
  if (!sortBy) return data;

  const dir = sortOrder === "asc" ? 1 : -1;
  const sorted = [...data];

  sorted.sort((a, b) => {
    let va;
    let vb;

    if (sortBy === "date") {
      va = a.date ? a.date.getTime() : 0;
      vb = b.date ? b.date.getTime() : 0;
    } else if (sortBy === "quantity") {
      va = a.quantity || 0;
      vb = b.quantity || 0;
    } else if (sortBy === "customerName") {
      va = (a.customerName || "").toLowerCase();
      vb = (b.customerName || "").toLowerCase();
    } else {
      return 0;
    }

    if (va < vb) return -1 * dir;
    if (va > vb) return 1 * dir;
    return 0;
  });

  return sorted;
};

const applyPagination = (data, page, pageSize) => {
  const total = data.length;
  const totalPages = Math.ceil(total / pageSize) || 1;

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  const pageData = data.slice(start, end);

  return {
    data: pageData,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
};

export const getSales = ({
  search,
  filters,
  sortBy,
  sortOrder = "desc",
  page = 1,
  pageSize = 10,
}) => {
  let data = findAllSales();

  data = applySearch(data, search);
  data = applyFilters(data, filters);
  data = applySorting(data, sortBy, sortOrder);

  return applyPagination(data, page, pageSize);
};
