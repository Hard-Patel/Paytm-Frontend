import { AmountTransfer, getUsersInterface } from "../interfaces/common";
import { UserSignInAction, UserSignupAction } from "../interfaces/user";
import { get, post } from "./helper";
import { routes } from "./routes";

export const getUsers = async ({
  filter = "",
  offset = 1,
  size = 5,
}: getUsersInterface) => {
  const filterOption = filter ? `filter=${filter}` : "";
  const offsetOption = filter ? `filter=${offset}` : "";
  const sizeOption = size ? `size=${size}` : "";

  let options = filterOption || offsetOption || sizeOption ? `?` : "";
  if (options) {
    options += filterOption ? filterOption : "";
    options += sizeOption ? sizeOption : "";
    options += offsetOption ? offsetOption : "";
  }

  const response = await get({
    url: `${routes.getUsers}${options}`,
  });
  if (response?.status) {
    return response;
  } else {
    throw new Error(response?.message ?? "Something went wrong");
  }
};

export const transferAmount = async ({ to, amount }: AmountTransfer) => {
  console.log("to, amount, token: ", to, amount);
  const response = await post({
    url: `${routes.transferAmount}`,
    params: { to, fund: amount },
  });
  console.log("response: ", response);
  if (response?.status) {
    return response;
  } else {
    throw new Error(response?.message ?? "Something went wrong");
  }
};

export const signUpUser = async (params: UserSignupAction) => {
  const response = await post({
    url: `${routes.signUp}`,
    params: params,
  });
  if (response?.status) {
    return response;
  } else {
    throw new Error(response?.message ?? "Something went wrong");
  }
};

export const signInUser = async (params: UserSignInAction) => {
  const response = await post({
    url: `${routes.signIn}`,
    params: params,
  });
  if (response?.status) {
    return response;
  } else {
    throw new Error(response?.message ?? "Something went wrong");
  }
};
