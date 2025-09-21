import API from "./api";

export const createOrder = async (items) => {
  const res = await API.post("/orders", { items });
  return res.data;
};

export const getUserOrders = async () => {
  const res = await API.get("/orders/user/me");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};
