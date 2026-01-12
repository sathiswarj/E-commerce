import { API_ENDPOINT } from "./ApiEndPoint";
import { ApiPostServiceWrapper, ApiPutServiceWrapper, ApiDeleteServiceWrapper,ApiPatchServiceWrapper } from "../WrapperService";

export const ApiRequestPost = {

  register: (name, email, password) => {
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/register",
      headers: { "Content-Type": "application/json" },
      body: { name, email, password },
    });
  },
  login: ({email, password}) => {
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/login",
      headers: { "Content-Type": "application/json" },
      body: { email, password },
    });
  },
  verifyOTP: (otp) => {
    return ApiPostServiceWrapper({
      url: API_ENDPOINT.corePath + "users/verify-email-otp",
      headers: { "Content-Type": "application/json" },
      body: { otp },
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
  },

addToCart: (data) => {
  const token = localStorage.getItem("authToken");

  return ApiPostServiceWrapper({
    url: API_ENDPOINT.corePath + "carts",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data, 
  });
},


    
updateCart: async ({productId, val}) => {
  const token = localStorage.getItem("authToken");
  return ApiPatchServiceWrapper({
    url: API_ENDPOINT.corePath + `carts/${productId}`, 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: { 
      productId: productId,  
      quantity: val 
    },
  });
},

removeCart: ({ productId  }) => {   
  const token = localStorage.getItem("authToken");
  return ApiDeleteServiceWrapper({
    url: API_ENDPOINT.corePath + `carts/${productId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
},
     clearCart: () => {
    const token = localStorage.getItem("authToken");

    return ApiDeleteServiceWrapper({
      url: API_ENDPOINT.corePath + "carts",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
     });
  },
 
};