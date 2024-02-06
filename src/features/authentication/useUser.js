// import { useQuery } from "react-query";
// import { getCurrentUser } from "../../services/apiAuth";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export function useUser() {
  // const { isLoading, data: user } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: getCurrentUser,
  // });

  // return { isLoading, user, isAuthenticated: user?.role === "authenticated" };

  const storedToken = sessionStorage.getItem("token");
  if (!storedToken)
    return { isAuthenticated: false, reason: "User Not Logged In" };

  const decoadedTokenData = jwtDecode(storedToken);
  const currentTime = Date.now() / 1000;
  console.log("brrrrr", decoadedTokenData, currentTime);

  if (decoadedTokenData.exp < currentTime) {
    sessionStorage.removeItem("token");

    return { isAuthenticated: false, reason: "Token Expired" };
  } else {
    console.log("decaded is ", decoadedTokenData);
  }
  // const userData = JSON.parse(storedData);
  // console.log("user details ", userData);
  // const user = userData?.token
  //   ? { token: userData.token, name: userData?.user?.name }
  //   : { token: "", name: "" };
  return { isAuthenticated: true, reason: "" };
}
