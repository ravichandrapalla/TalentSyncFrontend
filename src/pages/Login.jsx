import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
  row-gap: 3rem;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4"> Log in to your Account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
