import { API_ENDPOINT } from "./ApiEndPoint";
import { ApiPostServiceWrapper, ApiPutServiceWrapper } from "../WrapperService";

export const ApiRequestPost = {

  register: (name, email, password) => {
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/register",
      headers: { "Content-Type": "application/json" },
      body: { name, email, password },
    });
  },
  login: (email, password) => {
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/login",
      headers: { "Content-Type": "application/json" },
      body: { email, password },
    });
  },

 updateUser: (data) => {
    const token = localStorage.getItem("authToken");

    return ApiPutServiceWrapper({
      url: API_ENDPOINT.corePath + "users/adduser",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: data,
    });
  }
};