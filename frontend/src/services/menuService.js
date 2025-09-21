import axios from "axios";

export const getMenuByRestaurant = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/menu/${id}`);
  return response.data;
};
