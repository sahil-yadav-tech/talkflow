import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(
    "https://dummyjson.com/products"
  );

  return response.data.products;
};