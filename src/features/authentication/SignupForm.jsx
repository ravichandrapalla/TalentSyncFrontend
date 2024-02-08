/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import { useSignup } from "./useSignup";
import StyledInput from "../../ui/StyledInput";
import Spinner from "../../ui/Spinner";
import { BiLoaderAlt } from "react-icons/bi";

// Email regex: /\S+@\S+\.\S+/
const SpinnerBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: transparent;
  background-color: rgba(219, 214, 217, 0.2);
  backdrop-filter: blur(5px);
`;

const SpinnerContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledSelect = styled.select`
  background-color: grey;
  border-radius: 1rem;
  padding: 0.8rem;
`;
const StyledOption = styled.option`
  background-color: yellow;
  color: black;
  padding: 0.5rem;
`;

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      role: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const { errors } = formState;

  function onSubmit({ fullName, email, password, mobileNumber, role }) {
    signup(
      { fullName, email, password, mobileNumber, role },
      {
        onSettled: reset({
          fullName: "",
          email: "",
          password: "",
          passwordConfirm: "",
          mobileNumber: "",
          role: "",
        }),
      }
    );
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} type="signup">
        <FormRow label="User name" error={errors?.fullName?.message}>
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
        <FormRow label="Mobile number" error={errors?.mobileNumber?.message}>
          <StyledInput
            type="tel" // Input type for mobile number
            id="mobileNumber"
            disabled={isLoading}
            {...register("mobileNumber", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Mobile Number Should be atleast 10 digits",
              },
            })}
          />
        </FormRow>

        <FormRow label="Role" error={errors?.role?.message}>
          <StyledSelect
            type="text"
            id="role"
            disabled={isLoading}
            {...register("role", {
              required: "This field is required",
            })}
          >
            <StyledOption value="">Select Role</StyledOption>
            <StyledOption value="Recruiter">Recruiter</StyledOption>
            <StyledOption value="Client">Client</StyledOption>
          </StyledSelect>
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

        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
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
          <Button variation="secondary" type="reset" onClick={reset}>
            Clear
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </FormRow>
      </Form>
      {isLoading && (
        <SpinnerBackground>
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        </SpinnerBackground>
      )}
    </>
  );
}

export default SignupForm;
