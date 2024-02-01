import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

import FormRowVertical from "../../ui/FormRowVertical";

import useLogin from "./useLogin";
import SpinnerMini from "./../../ui/SpinnerMini";
import StyledInput from "../../ui/StyledInput";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
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
        <Button size="large">{!isLoading ? "Login" : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
