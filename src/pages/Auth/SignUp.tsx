import React, { useEffect } from "react";
import TextInput from "../../Components/TextInput";
import { Link } from "react-router-dom";
import { useUserSignUp } from "../../hooks/useUserSignup";

function SignUp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const { trySignUpUser } = useUserSignUp();

  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("isLoading, data: ", isLoading, data, error, isError);
  //   }
  // }, [isLoading]);

  const handleUserSignUp = () => {
    trySignUpUser({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      username,
    });
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
          SignUp
        </h4>
        <h5 style={{ paddingTop: 12, paddingBottom: 12, textAlign: "center" }}>
          Enter your information to create an account
        </h5>
        <div style={{ width: "100%" }}>
          <TextInput
            label="First name"
            placeholder="John"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last name"
            placeholder="Parker"
            value={lastName}
            setValue={setLastName}
          />
          <TextInput
            label="Username"
            placeholder="john"
            value={username}
            setValue={setUsername}
          />
          <TextInput
            label="Email"
            placeholder="john@domain.com"
            value={email}
            setValue={setEmail}
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
            onClick={handleUserSignUp}
          >
            <div style={{ color: "white", fontWeight: "bold" }}>Sign Up</div>
          </button>
          <p style={{ textAlign: "center", paddingTop: 10 }}>
            Already have an account?{" "}
            <Link to={"/signin"} hrefLang="jsdlf" style={{ color: "black" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export { SignUp };
