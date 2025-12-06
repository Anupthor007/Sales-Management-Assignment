import { useEffect, useState } from "react";
import { buildSalesQueryUrl } from "../utils/queryBuilder.js";

export const useSalesQuery = ({
  search,
  sortBy,
  sortOrder,
  page,
  filters,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

// Decide which API base URL to use
const apiBase =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const url = buildSalesQueryUrl({
  baseUrl: `${apiBase}/api/sales`,
  search,
  sortBy,
  sortOrder,
  page,
  filters,
});


        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [search, sortBy, sortOrder, page, JSON.stringify(filters)]);

  return { data, isLoading, error };
};
