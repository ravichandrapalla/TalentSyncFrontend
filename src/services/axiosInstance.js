import axios from "axios";
import config from "../config";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("axios intersepter triggered");
    const originalRequest = error.config;
    console.log(
      "status --> ",
      error.response.status,
      "other --> ",
      originalRequest
    );
    if (
      error.response.status === 401 &&
      (!originalRequest._retry || originalRequest._retry === undefined)
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = sessionStorage.getItem("token");
        const refreshToken = sessionStorage.getItem("refreshtoken");
        console.log(
          "acc token --> ",
          accessToken,
          "ref token --> ",
          refreshToken
        );
        if (!refreshToken) {
          console.log("refresh token is missing");
          return Promise.reject(error);
        }
        const response = await axios.post(
          `${config.apiBaseUrl}/refreshToken`,
          {},
          {
            headers: {
              Authorization: accessToken,
              refreshToken: refreshToken,
            },
          }
        );
        const newAaccessToken = response.headers["authorization"];
        console.log("received new access token ---> ", newAaccessToken);
        originalRequest.headers.Authorization = newAaccessToken;
        sessionStorage.setItem("token", newAaccessToken);
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("token fresh api failed");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
