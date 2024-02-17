import React, { useEffect } from "react";
import TextInput from "../../Components/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useUserSignIn } from "../../hooks/useUserSignIn";
import { useRecoilState } from "recoil";
import { userSession } from "../../recoil/atom/user";
import { Constants } from "../../utils/Constants";

function SignIn() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("1234");
  const [username, setUsername] = React.useState("hardpatel@gmail.com");
  const { trySignInUser, isLoading, isError, error, data } = useUserSignIn();
  const [user, setUser] = useRecoilState(userSession);

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data?.data);
      const authToken = data?.data?.token
      localStorage.setItem(Constants.AuthToken, authToken);
      navigate('/dashboard')
    }
  }, [isLoading, isError]);

  const handleSignIn = () => {
    trySignInUser({ username, password });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 6,
        }}
      >
        <h4
          style={{
            fontSize: 22,
            textAlign: "center",
            width: "20vw",
            fontWeight: "bold",
          }}
        >
          Sign In
        </h4>
        <h5 style={{ paddingTop: 12, paddingBottom: 12, textAlign: "center" }}>
          Enter your credentials to access your account
        </h5>
        <div style={{ width: "100%" }}>
          <TextInput
            label="Username"
            placeholder="john"
            value={username}
            setValue={setUsername}
          />
          <TextInput label="Password" value={password} setValue={setPassword} />
        </div>
        <div>
          <button
            style={{
              width: "100%",
              marginTop: 12,
              backgroundColor: "black",
              paddingBottom: 8,
              paddingTop: 8,
              borderRadius: 4,
              border: 0,
            }}
            onClick={handleSignIn}
          >
            <div style={{ color: "white", fontWeight: "bold" }}>Sign In</div>
          </button>
          <p style={{ textAlign: "center", paddingTop: 10 }}>
            Don't have an account?{" "}
            <Link to={"/signup"} hrefLang="jsdlf" style={{ color: "black" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export { SignIn };
