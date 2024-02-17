/**
 * @format
 */
import { create, CancelToken } from "apisauce";
import { Constants } from "../utils/Constants";
const cancelRequestList = {};

// define the api
export const api = create({
  baseURL: "http://localhost:3500/api/v1/",
  // baseURL: 'https://squad-staging-api.squadapp.co.uk/api/',
  headers: { Accept: "application/vnd.github.v3+json", Authorization: `Bearer ${localStorage.getItem(Constants.AuthToken)}` },
  timeout: 10000,
});

const cancelRequests = (...keys) => {
  keys.forEach((key) => {
    if (cancelRequestList[key]) {
      cancelRequestList[key]();
    }
  });
};

const getErrorMessage = (response) => {
  let errorMessage = response.problem;
  if (errorMessage === "NETWORK_ERROR") {
    errorMessage = "Network error";
  } else if (errorMessage === "TIMEOUT_ERROR") {
    errorMessage = "Something went wrong. Please try again later";
  } else if (errorMessage === "SERVER_ERROR") {
    errorMessage = "Server error";
  }
  return errorMessage;
};

const processResonse = (response) => {
  const data = response.data || {
    status: 0,
    message: getErrorMessage(response),
  };
  return { ...data, cancel: response.problem === "CANCEL_ERROR" };
};

const get = (data) => {
  const { url, cancelKey, params, headers } = data;
  return api
    .get(url, params, {
      cancelToken: new CancelToken((c) => {
        cancelRequestList[cancelKey] = c;
      }),
      headers: { "Content-Type": "application/json", ...headers },
    })
    .then((res) => {
      return processResonse(res);
    });
};

const put = (data) => {
  const { url, cancelKey, params, headers } = data;
  return api
    .put(url, params, {
      cancelToken: new CancelToken((c) => {
        cancelRequestList[cancelKey] = c;
      }),
      headers: { "Content-Type": "application/json", ...headers },
    })
    .then((res) => {
      return processResonse(res);
    });
};

const post = (data) => {
  const { url, cancelKey, params, headers } = data;
  return api
    .post(url, params, {
      cancelToken: new CancelToken((c) => {
        cancelRequestList[cancelKey] = c;
      }),
      headers: { "Content-Type": "application/json", ...headers },
    })
    .then((res) => {
      return processResonse(res);
    });
};

export { cancelRequests, get, put, post };
