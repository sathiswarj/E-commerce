import {ApiGetServiceWrapper} from '../WrapperService'
import { API_ENDPOINT } from "./ApiEndPoint";

export const ApiRequestGet = {
     getAllUsers: () => {
        return ApiGetServiceWrapper({
          url: API_ENDPOINT.corePath + "users/getAllUsers",
          headers: { "Content-Type": "application/json" },
         
        });
      },
       getAllProducts: () => {
        return ApiGetServiceWrapper({
          url: API_ENDPOINT.corePath + "products",
          headers: { "Content-Type": "application/json" },
         
        });
      },
       getOneProduct: (id) => {
       
          return ApiGetServiceWrapper({
            url: API_ENDPOINT.corePath + `products/${id}`, 
            headers: { 
              "Content-Type": "application/json",
             },
          });
        },
}