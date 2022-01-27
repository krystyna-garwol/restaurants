import axios from "axios";
import configJson from "../config/auth_config.json";

const axiosInstance = axios.create({
  baseURL: `${configJson.apiOrigin}`,
});

export const getRestaurants = (setRestaurants) => {
  axiosInstance
    .get("/restaurants")
    .then((res) => setRestaurants(res.data))
    .catch((err) => console.log(err));
};

export const addRestaurant = (formData, setRestaurants, token) => {
  axiosInstance
    .post("/restaurants", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => getRestaurants(setRestaurants))
    .catch((err) => console.log(err));
};
