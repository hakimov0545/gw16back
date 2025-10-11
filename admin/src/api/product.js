import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4444/products");
      return res.data;
    },
  });

  return { data, isLoading, error };
};

export default getProducts;
