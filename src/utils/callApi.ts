const initialOptions = {
  method: "get",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrer: "no-referrer",
};

const callApi = async (path: any, requestOptions = {}) => {
  const options: any = { ...initialOptions, ...requestOptions };

  options.headers.authorization = localStorage.getItem("accessToken");

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(path, options);

  // if (response.ok) {
  //   const data = await response.json();
  //   return data;
  // }

  return response;
};

export default callApi;
