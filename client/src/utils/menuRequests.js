import axios from "axios";
import configJson from "../config/auth_config.json";

const axiosInstance = axios.create({
  baseURL: `${configJson.apiOrigin}`,
});

export const getMenus = (setMenuItems, restaurantId) => {
  axiosInstance
    .get(`/menus/${restaurantId}`)
    .then((res) => {
      setMenuItems(res.data);
    })
    .catch((err) => console.log(err));
};

export const addMenu = (formData, setMenuItems, token) => {
  console.log(formData);
  axiosInstance
    .post("/menus", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => getMenus(setMenuItems, formData.restaurantId))
    .catch((err) => console.log(err));
};
