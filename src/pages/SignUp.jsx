import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import styled from "styled-components";

const SignUpLayout = styled.main`
  min-height: 100vh;
  min-width: 100vw;
  /* display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem; */
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
  row-gap: 3rem;
`;
export function SignUp() {
  return (
    <SignUpLayout>
      <Heading as="h1">Register</Heading>
      <SignupForm />
    </SignUpLayout>
  );
}
