import { API_ENDPOINT } from "./ApiEndPoint";
import {ApiGetServiceWrapper} from '../WrapperService'

export const ApiRequestGet = {
  getAllProducts: () => {
    const token = localStorage.getItem("authToken"); // read token from storage

    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + "products", // make sure your backend route matches
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },
};
