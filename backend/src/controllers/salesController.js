import { fetchSales } from "../services/salesService.js";

const parseList = (val) => {
  if (!val) return [];
  return String(val)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

export const getSales = async (req, res) => {
  try {
    const {
      search = "",
      sortBy = "date",
      sortOrder = "desc",
      page = "1",
      pageSize = "10",
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

    const filters = {
      customerRegions: parseList(customerRegions),
      genders: parseList(genders),
      productCategories: parseList(productCategories),
      tags: parseList(tags),
      paymentMethods: parseList(paymentMethods),
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    };

    const result = await fetchSales({
      search,
      sortBy,
      sortOrder,
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      filters,
    });

    res.json(result);
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
