/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import { useSignup } from "./useSignup";
import StyledInput from "../../ui/StyledInput";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/
const SpinnerContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset({
          fullName: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="signup">
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <StyledInput
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <StyledInput
          type="email"
          disabled={isLoading}
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <StyledInput
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be atleast 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <StyledInput
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Clear
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
      <SpinnerContainer>{isLoading && <Spinner />}</SpinnerContainer>
    </Form>
  );
}

export default SignupForm;
