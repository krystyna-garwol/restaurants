import axios from "axios";
import configJson from "../config/auth_config.json";

const axiosInstance = axios.create({
  baseURL: `${configJson.apiOrigin}`,
});

export const getPendingOrders = (setPendingOrders, userId) => {
  axiosInstance
    .get("/orders", {
      headers: {
        userId: userId,
      },
    })
    .then((res) => setPendingOrders(res.data))
    .catch((err) => console.log(err));
};

export const addOrder = (formData, setPendingOrders, userId, token) => {
  axiosInstance
    .post("/orders", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        userId: userId,
      },
    })
    .then(() => getPendingOrders(setPendingOrders, userId))
    .catch((err) => console.log(err));
};

export const updateOrder = (formData, setPendingOrders, userId, token) => {
  axiosInstance
    .put("/orders", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => getPendingOrders(setPendingOrders, userId))
    .catch((err) => console.log(err));
};

export const deleteOrder = (orderId, userId, setPendingOrders, token) => {
  axiosInstance
    .delete(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => getPendingOrders(setPendingOrders, userId))
    .catch((err) => console.log(err));
};
