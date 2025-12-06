import { getSales } from "../services/salesService.js";

export const getSalesHandler = (req, res, next) => {
  try {
    const {
      search = "",
      page = "1",
      pageSize = "10",
      sortBy = "",
      sortOrder = "",
      customerRegions,
      genders,
      productCategories,
      tags,
      paymentMethods,
      ageMin,
      ageMax,
      dateFrom,
      dateTo,
    } = req.query;

    const parseList = (value) =>
      value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

    const filters = {
      customerRegions: parseList(customerRegions),
      genders: parseList(genders),
      productCategories: parseList(productCategories),
      tags: parseList(tags),
      paymentMethods: parseList(paymentMethods),
      ageMin: ageMin ? Number(ageMin) : null,
      ageMax: ageMax ? Number(ageMax) : null,
      dateFrom: dateFrom ? new Date(dateFrom) : null,
      dateTo: dateTo ? new Date(dateTo) : null,
    };

    if (
      filters.ageMin !== null &&
      filters.ageMax !== null &&
      filters.ageMin > filters.ageMax
    ) {
      return res.json({
        data: [],
        total: 0,
        page: 1,
        pageSize: Number(pageSize) || 10,
        totalPages: 1,
      });
    }

    const response = getSales({
      search,
      filters,
      sortBy,
      sortOrder: sortOrder || (sortBy === "date" ? "desc" : "asc"),
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
    });

    res.json(response);
  } catch (err) {
    next(err);
  }
};
