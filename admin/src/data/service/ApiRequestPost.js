import { API_ENDPOINT } from "./ApiEndPoint";
import { ApiPatchServiceWrapper, ApiPostServiceWrapper,ApiDeleteServiceWrapper } from "../WrapperService";

export const ApiRequestPost = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "adminlogin",
        headers: { "Content-Type": "application/json" }, 
        body: { email, password },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
addProduct: (formPayload) => {
  return new Promise((resolve, reject) => {
    ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "products",
      // headers: { "Content-Type": "application/json" },
      body: formPayload,
    })
    
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
},

editProduct: (productId, formPayload) => {
  return new Promise((resolve, reject) => {
    ApiPatchServiceWrapper({
      url: `${API_ENDPOINT.corePath}products/${productId}`,
      body: formPayload,
      headers: {
 
      }
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
},

deleteProduct: (productId) => {
  return new Promise((resolve, reject) => {
    ApiDeleteServiceWrapper({
      url: `${API_ENDPOINT.corePath}products/${productId}`,
      // headers: { "Content-Type": "application/json" },
     })
    
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
},
};
