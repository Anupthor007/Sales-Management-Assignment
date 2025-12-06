export const buildSalesQueryUrl = ({
  baseUrl,
  search,
  sortBy,
  sortOrder,
  page,
  filters,
}) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);
  if (page) params.set("page", String(page));
  params.set("pageSize", "10");

  const setList = (key, list) => {
    if (list && list.length) {
      params.set(key, list.join(","));
    }
  };

  setList("customerRegions", filters.customerRegions);
  setList("genders", filters.genders);
  setList("productCategories", filters.productCategories);
  setList("tags", filters.tags);
  setList("paymentMethods", filters.paymentMethods);

  if (filters.ageMin) params.set("ageMin", filters.ageMin);
  if (filters.ageMax) params.set("ageMax", filters.ageMax);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);

  return `${baseUrl}?${params.toString()}`;
};
