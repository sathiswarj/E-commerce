const getToken = () => localStorage.getItem("authToken"); 

export const ApiGetServiceWrapper = async ({ url = "", headers = {} }) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return await res.json();
};

export const ApiGetServiceWrapperBlob = ({ url = "", headers = {} }) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
      ...headers,
    },
  });
};

export const ApiPostServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const isFormData = body instanceof FormData;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
       ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: isFormData ? body : JSON.stringify(body),
  });

  return await res.json();
};


export const ApiPutServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const ApiPatchServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
