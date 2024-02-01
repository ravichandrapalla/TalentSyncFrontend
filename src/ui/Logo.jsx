import styled from "styled-components";
import LogoIcon from "../images/Logo.png";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 5rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={LogoIcon} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
