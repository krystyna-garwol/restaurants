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

export const addRestaurant = (formData, formImage, setRestaurants, token) => {
  let form = new FormData();
  form.append(
    "data",
    new Blob([JSON.stringify(formData)], {
      type: "application/json",
    })
  );
  form.append("file", formImage);
  axiosInstance
    .post("/restaurants", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => getRestaurants(setRestaurants))
    .catch((err) => console.log(err));
};
