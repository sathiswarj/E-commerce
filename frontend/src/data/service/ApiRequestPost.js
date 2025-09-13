import { API_ENDPOINT } from "./ApiEndPoint";
import { ApiPostServiceWrapper } from "../WrapperService";


export const ApiRequestPost = {
      register: (name,email, password) => {
 
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "api/users/register",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
            name,
          email,
          password,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
      login: ( email, password) => {
 
    return new Promise((resolve, reject) => {
          let token = localStorage.getItem("authToken");

      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "api/users/login",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: {
           email,
          password,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
}