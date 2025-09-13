import { API_ENDPOINT } from "./ApiEndPoint";
import { ApiPostServiceWrapper } from "../WrapperService";

export const ApiRequestPost = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "api/adminlogin",
        headers: { "Content-Type": "application/json" }, 
        body: { email, password },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
