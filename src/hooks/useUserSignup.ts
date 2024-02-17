import { useMutation } from "react-query";
import { signUpUser } from "../api/apis";
import { UserSignupAction } from "../interfaces/user";
import { TOAST_TYPE, showToast } from "../utils/global.utils";

const useUserSignUp = () => {
  const queryKey = "signupUser";
  const signup = useMutation(queryKey, signUpUser, {
    onSuccess: (data) => {
      showToast(TOAST_TYPE.error, data?.data?.msg ?? "Something");
    },
    onError: (error) => {
      console.log('error: ', error);
      showToast(TOAST_TYPE.error, "Sertret");
    }
  });

  const trySignUpUser = (variables: UserSignupAction) =>
    signup.mutate(variables);

  return { trySignUpUser, ...signup };
};

export { useUserSignUp };
