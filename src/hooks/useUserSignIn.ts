import { useMutation } from "react-query";
import { signInUser } from "../api/apis";
import { UserSignInAction } from "../interfaces/user";

const useUserSignIn = () => {
  const queryKey = "signinUser";
  const signIn = useMutation(queryKey, signInUser);

  const trySignInUser = (variables: UserSignInAction) =>
    signIn.mutate(variables);

  return { trySignInUser, ...signIn };
};

export { useUserSignIn };
