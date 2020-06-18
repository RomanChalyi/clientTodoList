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

const callApi = async (path: string, requestOptions = {}) => {
  const options: any = { ...initialOptions, ...requestOptions };
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(path, options);
  const data = await response.json();
  if (response.ok) {
    return data;
  }

  return Promise.reject(data);
};

export default callApi;
