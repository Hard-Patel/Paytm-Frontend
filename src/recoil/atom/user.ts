import { atom } from "recoil";
import { UserAccountInfo } from "../../interfaces/user";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userSession = atom<UserAccountInfo | undefined>({
  key: "userSessionState", // unique ID (with respect to other atoms/selectors),
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
