import "../../index.css";
import React, { useEffect, useState } from "react";
import TextInput from "../../Components/TextInput";
import { useLocation, useNavigate } from "react-router-dom";
import { User, UserAccountInfo } from "../../interfaces/user";
import { useTransfer } from "../../hooks/useTransfer";
import { useRecoilState } from "recoil";
import { userSession } from "../../recoil/atom/user";
import { Constants } from "../../utils/Constants";
import { ThreeCircles } from "react-loader-spinner";

function Transfer() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userSession);
  const { state }: { state: User } = useLocation();
  const [amount, setAmount] = useState("");
  const { tryAmountTransfer, isLoading, data, error, isError } = useTransfer();

  useEffect(() => {
    if (!isLoading && data?.data?.balance) {
      // console.log("isLoading, data: ", isLoading, data, error, isError);
      const updatedUser: UserAccountInfo = {
        Account: { balance: data?.data?.balance },
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        username: user?.username ?? "",
        email: user?.email ?? "",
        token: user?.token ?? "",
        id: user?.id ?? 0,
        password: user?.password ?? "",
      };
      setUser(updatedUser);
      navigate("/dashboard");
    }
  }, [isLoading, setUser]);

  const handleTransferInitiate = () => {
    tryAmountTransfer({
      amount: parseFloat(amount),
      to: state.id,
    });
  };

  React.useEffect(() => {
    if (!localStorage.getItem(Constants.AuthToken)) {
      navigate("/signin");
    }
  }, []);

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
          Transfer Funds
        </h4>
        <div style={{ width: "100%" }}>
          <div
            style={{
              marginRight: 14,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                backgroundColor: "gray",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              {state?.firstName[0] ?? "P"}
            </p>
            {`${state?.firstName} ${state?.lastName}`}
          </div>
          <TextInput
            label="Amount (in RS)"
            placeholder="john"
            value={amount}
            setValue={setAmount}
            inputType="number"
          />
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
            onClick={handleTransferInitiate}
          >
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                display: "flex",
              }}
            >
              {isLoading ? (
                <ThreeCircles
                  visible={true}
                  height="24"
                  width="24"
                  color="#ffffff"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <p>Initiate Transfer</p>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Transfer };
