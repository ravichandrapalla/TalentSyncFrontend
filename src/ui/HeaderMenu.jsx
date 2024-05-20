import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../features/authentication/UserContext";
// import { DarkModeToggle } from "./DarkModeToggle";
import defaultAvatar from "../images/default-user.jpg";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import PopupModal from "./PopupModal";
const StyledHeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledLegend = styled.div`
  min-width: 10em;
  font-size: x-large;
  font-weight: 600;
  font-family: "Outfit Variable", sans-serif;
`;
const StyledHeaderMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 2rem;
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
  position: relative;
  cursor: pointer;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid grey;
  padding: 0 0.6rem;
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: pink;
  }
  //
  /* background: none;
 

  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  } */
`;

export function HeaderMenu() {
  const userData = useContext(UserContext);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const navigate = useNavigate();
  const storeData = useSelector((state) => state);
  useEffect(() => {
    console.log("current page is -------->", storeData.tabSlice.tab);
  }, [storeData.tabSlice]);
  useEffect(() => console.log("Header menu context data", userData), []);
  return (
    <StyledHeaderContainer>
      <StyledLegend>
        <p>{storeData.tabSlice.tab}</p>
      </StyledLegend>
      {/* <SearchBox /> */}

      <StyledHeaderMenu>
        <li>
          <Avatar
            src={defaultAvatar}
            alt={`Avatar of `}
            onClick={() => setAccountPopupOpen((open) => !open)}
          />
          <PopupModal
            isModalOpen={accountPopupOpen}
            email={userData?.storedEmail}
          />
        </li>

        {/* <li>
          <Mail>{userData?.storedEmail}</Mail>
        </li> */}
        <li>
          <IconContainer onClick={() => navigate("/account")}>
            <IoSettingsOutline size={50} />
          </IconContainer>
        </li>
        {/* <li>
        <DarkModeToggle />
      </li> */}
        {/* <li>
          <Logout />
        </li> */}
      </StyledHeaderMenu>
    </StyledHeaderContainer>
  );
}
