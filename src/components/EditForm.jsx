/* eslint-disable react/prop-types */
import useUpdateUser from "../features/authentication/useUpdateUser";

import styled from "styled-components";
import SpinnerComponent from "../ui/SpinnerComponent";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import { useForm } from "react-hook-form";
import Form from "../ui/Form";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const ModalDescription = styled.p`
  font-size: 3rem;
`;
// const ButtionsSection = styled.button`
//   display: flex;
//   gap: 1rem;
//   justify-content: space-around;
//   background: transparent;
//   border: none;
//   outline: none;
// `;
// const StyledButton = styled.button`
//   background-color: ${(props) =>
//     props.type === "close" ? "#76abae" : "#76abae"};
//   padding: 1rem;
//   font-size: larger;
//   border-radius: 1rem;
//   border: none;
//   color: #fff;
//   cursor: pointer;
// `;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  background-color: rgba(219, 214, 217, 0.2);
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #feca1f;
  width: 45%;
  height: 45%;
  border-radius: 1.5rem;
  padding: 1rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  justify-content: space-around;
  text-align: center;
  overflow: hidden;
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
// const Details = styled.span`
//   font-size: medium;
//   font-weight: 400;
//   font-family: "Outfit Variable", sans-serif;
// `;
// const FormBox = styled.form`
//   padding: 0.5rem;
// `;

export default function EditForm({ isOpen, onClose, user, updateLocalData }) {
  console.log(" finallly theuser is ", user);
  const [userDetails, setUserDetails] = useState({});
  const { updateUser, isLoading } = useUpdateUser();
  const { register, formState, getValues, handleSubmit, reset, setValue } =
    useForm({
      defaultValues: {
        organization: "",
        role: "",
      },
    });
  const handleUpdateUser = ({ organization, role }) => {
    const regId = user.registration_number;
    console.log("pasing data is ", regId, organization, role);
    const payload = {
      organization,
      role,
    };

    updateUser(
      { regId, payload },
      {
        onSuccess: ({ message, updatedRecord }) => {
          toast.success(message || "Data Updated");
          updateLocalData({ message, updatedRecord });
          onClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  useEffect(() => {
    setValue("organization", user.organization || "No data");
    console.log("mountine time user data", user);
    setValue("role", user.role);
    setUserDetails(user);
  }, [isOpen]);

  console.log("data is --->", getValues());

  const { errors } = formState;
  return isLoading ? (
    <SpinnerComponent />
  ) : (
    isOpen && (
      <ModalBackground>
        <ModalContainer>
          <ModalDescription>{`Edit user ${user.username}`}</ModalDescription>
          <Form onSubmit={handleSubmit(handleUpdateUser)} type="updateUser">
            <FormRow label="Organization" error={errors?.organization?.message}>
              <StyledInput
                type="text"
                id="organization"
                {...register("organization", {
                  required: "Please Enter a value to Update",
                })}
                defaultValue={getValues().organization}
                disabled={isLoading}
              />
            </FormRow>
            <FormRow label="Role" error={errors?.role?.message}>
              <StyledSelect
                type="text"
                id="role"
                {...register("role", {
                  required: "Please Enter a value to Update",
                })}
                disabled={isLoading}
                defaultValue={user.role}
              >
                <StyledOption value="Client">Client</StyledOption>
                <StyledOption value="Recruiter">Recruiter</StyledOption>
              </StyledSelect>
            </FormRow>
            <FormRow>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={reset} type="submit">
                Proceed
              </Button>
            </FormRow>
          </Form>
        </ModalContainer>
      </ModalBackground>
    )
  );
}
