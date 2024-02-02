import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import styled from "styled-components";

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
export function SignUp() {
  return (
    <SignUpLayout>
      <Heading as="h1">Register</Heading>
      <SignupForm />
    </SignUpLayout>
  );
}
