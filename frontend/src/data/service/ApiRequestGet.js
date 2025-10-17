import { API_ENDPOINT } from "./ApiEndPoint";
import {ApiGetServiceWrapper} from '../WrapperService'

export const ApiRequestGet = {
  getAllProducts: () => {
    const token = localStorage.getItem("authToken");  

    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + "products", 
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },

    getOneUser: () => {
    const token = localStorage.getItem("authToken");  
    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + "users/getuser",  
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },

  getOneProduct: (id) => {
    const token = localStorage.getItem("authToken");  

    return ApiGetServiceWrapper({
      url: API_ENDPOINT.corePath + `products/${id}`, 
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  },
};
