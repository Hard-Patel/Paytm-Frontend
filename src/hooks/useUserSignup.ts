import { useMutation } from "react-query";
import { signUpUser } from "../api/apis";
import { UserSignupAction } from "../interfaces/user";

const useUserSignUp = () => {
  const queryKey = "signupUser";
  const signupUser = useMutation(queryKey, signUpUser);

  const trySignUpUser = (variables: UserSignupAction) =>
  signupUser.mutate(variables);

  return { trySignUpUser, ...signUpUser };
};

export { useUserSignUp };
