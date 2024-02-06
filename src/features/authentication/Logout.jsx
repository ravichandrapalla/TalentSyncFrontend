import ButtonIcon from "./../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router";

import { logout } from "../../services/apiAuth";
export function Logout() {
  // const { logout, isLoading } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <ButtonIcon onClick={handleLogout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}
