export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  balance: number;
}

export interface UserSignupAction {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserSignInAction {
  username: string;
  password: string;
}

export interface UserAccountInfo {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  Account: {
    balance: number;
  };
  token: string;
}
