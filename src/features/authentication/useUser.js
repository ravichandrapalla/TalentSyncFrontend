import { jwtDecode } from "jwt-decode";

// import { refreshToken } from "../../services/apiAuth";
export function useUser() {
  // const [isAuthentic, setIsAuthentic] = useState(false);
  // const [userData, setUserData] = useState(null);
  // const [reason, setReason] = useState("");

  const storedToken = sessionStorage.getItem("token");
  if (!storedToken) {
    return {
      isAuthentic: false,
      userData: {},
      reason: "User Not Logged In",
    };
  }

  const decoadedTokenData = jwtDecode(storedToken);
  // const currentTime = Date.now() / 1000;
  // const timeToRefresh = decoadedTokenData.exp - currentTime - 60; // Refresh token 1 minute before expiry
  // console.log(
  //   "Times -> ",
  //   decoadedTokenData,
  //   currentTime,
  //   decoadedTokenData.exp > currentTime
  // );
  // console.log("dec  -->  ", timeToRefresh / 3600);
  // if (decoadedTokenData.exp - currentTime < 0) {
  //   console.log("calling refresh ");
  //   refreshToken().then((msg) =>
  //     console.log("msg is ", msg).catch((err) => console.log(err))
  //   );
  // } else {
  //   console.log("setting auth to true ");
  //   return {
  //     isAuthentic: true,
  //     userData: decoadedTokenData,
  //     reason: "",
  //   };
  // }
  // if (currentTime > decoadedTokenData.exp) {
  //   console.log("calling refresh ");
  //   refreshToken().then((msg) =>
  //     console.log("msg is ", msg).catch((err) => console.log(err))
  //   );
  // } else {
  //   console.log("setting auth to true ");
  //   return {
  //     isAuthentic: true,
  //     userData: decoadedTokenData,
  //     reason: "",
  //   };
  // }

  return {
    isAuthentic: true,
    userData: decoadedTokenData,
    reason: "",
  };
}
