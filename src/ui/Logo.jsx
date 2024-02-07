import styled from "styled-components";
import LogoIcon from "../images/Logo.png";
import { useContext } from "react";
import UserContext from "../features/authentication/UserContext";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 5rem;
  width: auto;
`;
const StyledUserName = styled.p`
  color: #ffbf00;
  font-weight: 500;
`;
function Logo() {
  const userData = useContext(UserContext);
  return (
    <StyledLogo>
      <Img src={LogoIcon} alt="Logo" />
      <StyledUserName>{userData?.username}</StyledUserName>
    </StyledLogo>
  );
}

export default Logo;
