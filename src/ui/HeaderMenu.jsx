import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../features/authentication/UserContext";
// import { DarkModeToggle } from "./DarkModeToggle";
import defaultAvatar from "../images/default-user.jpg";
import SearchBox from "./SearchBox";

const StyledHeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledLegend = styled.div`
  font-size: x-large;
  font-weight: 600;
  font-family: "Outfit Variable", sans-serif;
`;
const StyledHeaderMenu = styled.ul`
  display: flex;

  gap: 0.4rem;
`;
const Mail = styled.p`
  color: green;
  font-weight: 500;
  padding: 0.6rem;
`;
const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export function HeaderMenu() {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => console.log("Header menu context data", userData), []);
  return (
    <StyledHeaderContainer>
      <StyledLegend>
        <p>Dashboard</p>
      </StyledLegend>
      <SearchBox />

      <StyledHeaderMenu>
        <Avatar src={defaultAvatar} alt={`Avatar of `} />
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
    </StyledHeaderContainer>
  );
}
