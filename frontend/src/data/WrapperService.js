const getToken = () => localStorage.getItem("authToken");  

 const handleResponse = async (res) => {
  if (res.status === 401) {
     localStorage.removeItem("authToken");
    // window.location.href = "/login";  
    throw new Error("Unauthorized - please login again.");
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Request failed: ${res.status} - ${errorText}`);
  }

  return res.json();
};

export const ApiGetServiceWrapper = async ({ url = "", headers = {} }) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",    
      Pragma: "no-cache",
      ...headers,
    },
  });
  return handleResponse(res);
};

export const ApiGetServiceWrapperBlob = async ({ url = "", headers = {} }) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Cache-Control": "no-cache",    
      Pragma: "no-cache",
      ...headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
    throw new Error("Unauthorized - please login again.");
  }
  return res; 
};

export const ApiPostServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

export const ApiPutServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

export const ApiPatchServiceWrapper = async ({ url = "", headers = {}, body = {} }) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};
