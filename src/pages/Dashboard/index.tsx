import React from "react";
import "../../index.css";
import TextInput from "../../Components/TextInput";
import { User } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { useRecoilState } from "recoil";
import { userSession } from "../../recoil/atom/user";
import { useDebounce } from "../../hooks/useDebounce";
import { Constants } from "../../utils/Constants";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userSession);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, isLoading, refetch } = useUsers(
    debouncedSearch.trim()
  );

  React.useEffect(() => {
    if (!localStorage.getItem(Constants.AuthToken)) {
      navigate("/signin");
    }
  }, []);

  const [users, setUsers] = React.useState<User[]>();
  React.useEffect(() => {
    if (!isLoading && !isFetching && data) {
      setUsers(data?.pages[0]?.data);
    }
  }, [isLoading, isFetching]);

  React.useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  const handleLogout = () => {
    localStorage.removeItem(Constants.AuthToken);
    setUser(undefined);
    navigate("/signin");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 14,
          marginRight: 18,
          marginLeft: 18,
          paddingBottom: 14,
          borderBottomWidth: 1,
          border: 1,
        }}
      >
        <div>
          <p style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            Payment App
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p>Hello, {user?.firstName ?? "User"}</p>
          <div
            style={{
              backgroundColor: "gray",
              marginLeft: 12,
              height: 15,
              width: 15,
              borderRadius: 15,
              padding: 7,
              textAlign: "center",
            }}
          >
            {`${user?.firstName ? user?.firstName[0] : "U"}`}
          </div>
        </div>
      </div>
      <div
        style={{
          border: "1px",
          borderColor: "black",
          borderTopWidth: 1,
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
          }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "900",
              fontSize: 18,
            }}
          >{`Your Balance: ${user?.Account.balance}`}</p>
          <button style={{ padding: 4 }} onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div style={{ paddingTop: 15 }}>
          <p style={{ fontWeight: "bold", fontSize: 18 }}>Users</p>
          <TextInput
            placeholder="Search users..."
            value={search}
            setValue={setSearch}
            style={{ width: "95%" }}
          />
          <div style={{ paddingTop: 12, paddingBottom: 12 }}>
            {users && users.length ? (
              users.map((user, index) => {
                return (
                  <div
                    key={`User ${user.id} ${index}`}
                    style={{
                      paddingTop: 8,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          marginRight: 14,
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
                          }}
                        >
                          {user.firstName[0]}
                        </p>
                      </div>
                      <p>{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    <button
                      style={{
                        width: "10%",
                        marginTop: 12,
                        backgroundColor: "black",
                        paddingBottom: 8,
                        paddingTop: 8,
                        borderRadius: 4,
                        border: 0,
                      }}
                      onClick={() => {
                        navigate(`/send`, { state: user });
                      }}
                    >
                      <div style={{ color: "white", fontWeight: "bold" }}>
                        Send Money
                      </div>
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: 8 }}>No users found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Dashboard };
