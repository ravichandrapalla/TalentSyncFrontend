import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import styled, { css } from "styled-components";
import FormRowVertical from "../../ui/FormRowVertical";
import toast from "react-hot-toast";
import useLogin from "./useLogin";
import SpinnerMini from "./../../ui/SpinnerMini";
import StyledInput from "../../ui/StyledInput";
import { useNavigate } from "react-router";

const RegisterLink = styled.a`
  ${(props) =>
    props.type === "registerlink" &&
    css`
      align-self: flex-end;
    `}
  font-size: 1rem;
  color: green;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
        onSuccess: () => {
          toast.success("Successfully Logged In");
          console.log("going to navigate");
          navigate("/dashboard");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <StyledInput
          type="email"
          id="email"
          // This makes this form better for password managers
          // autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <StyledInput
          type="password"
          id="password"
          // autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <RegisterLink type="registerlink" href="http://localhost:5173/register">
          New user? Signup
        </RegisterLink>
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large">{!isLoading ? "Login" : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
