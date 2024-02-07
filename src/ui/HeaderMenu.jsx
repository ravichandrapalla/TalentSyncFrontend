import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../features/authentication/UserContext";
// import { DarkModeToggle } from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const Mail = styled.p`
  color: green;
  font-weight: 500;
  padding: 0.6rem;
`;
export function HeaderMenu() {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => console.log("Header menu context data", userData), []);
  return (
    <StyledHeaderMenu>
      <li>
        <Mail>{userData.storedEmail}</Mail>
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      {/* <li>
        <DarkModeToggle />
      </li> */}
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
