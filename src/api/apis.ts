import { AmountTransfer, getUsersInterface } from "../interfaces/common";
import { UserSignInAction, UserSignupAction } from "../interfaces/user";
import { get, post } from "./helper";
import { routes } from "./routes";

export const getUsers = async ({
  filter = "",
  offset = 1,
  size = 5,
}: getUsersInterface) => {
  const response = await get({
    url: `${routes.getUsers}`,
    params: { filter, offset, size },
  });
  console.log('response: ', response);
  if (response?.status) {
    return response;
  } else {
    throw new Error(response?.message ?? "Something went wrong");
  }
};

export const transferAmount = async ({ to, amount }: AmountTransfer) => {
  const response = await post({
    url: `${routes.transferAmount}`,
    params: { to, fund: amount },
  });
  if (response?.status) {
    return response;
  } else {
    throw new Error(response?.msg ?? "Something went wrong");
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
