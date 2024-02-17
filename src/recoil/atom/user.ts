import { atom } from "recoil";
import { UserAccountInfo } from "../../interfaces/user";

export const userSession = atom<UserAccountInfo|undefined>({
  key: "userSessionState", // unique ID (with respect to other atoms/selectors),
  default: undefined
});
