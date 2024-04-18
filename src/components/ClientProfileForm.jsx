/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import useClientProfile from "../features/authentication/useClientProfile";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import UserContext from "../features/authentication/UserContext";
import SpinnerComponent from "../ui/SpinnerComponent";
import useUserUpToDateDetails from "./../features/authentication/useUserUptodateDetails";
import toast from "react-hot-toast";
import styled from "styled-components";
import MapLocationPicker from "../ui/LocationPicker";

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

export default function ClientProfileForm({ handleUpdate, currUserData }) {
  //   const userData = useContext(UserContext);

  // const setReqLoading = false;
  // const handleUpdate = (e, str) => {
  //   console.log("handle clied");
  // };

  return (
    <>
      <Form type="profile">
        <FormRow label="Registration Number">
          <StyledInput
            type="text"
            id="registrationNumber"
            disabled
            defaultValue={currUserData.registration_number}
            onBlur={(e) => handleUpdate(e, "registration_number")}
          />
        </FormRow>
        <FormRow label="User Name">
          <StyledInput
            type="text"
            id="username"
            defaultValue={currUserData.username}
            onBlur={(e) => handleUpdate(e, "username")}
          />
        </FormRow>
        <FormRow label="Email">
          <StyledInput
            type="email"
            id="email"
            defaultValue={currUserData.email}
            onBlur={(e) => handleUpdate(e, "email")}
          />
        </FormRow>
        <FormRow label="Phone Number">
          <StyledInput
            minLength={10}
            maxLength={10}
            type="number"
            id="mobile_number"
            defaultValue={currUserData.mobile_number}
            onBlur={(e) => handleUpdate(e, "mobile_number")}
          />
        </FormRow>

        <FormRow label="Organization">
          <StyledInput
            type="text"
            id="organization"
            defaultValue={currUserData.organization}
            onBlur={(e) => handleUpdate(e, "organization")}
          />
        </FormRow>
        <FormRow label="Experience (In Years)">
          <StyledInput
            type="number"
            id="experience"
            defaultValue={currUserData.experience || "2"}
            onBlur={(e) => handleUpdate(e, "experience")}
          />
        </FormRow>
        <FormRow label="Highest Qualification">
          <StyledSelect
            type="text"
            id="highest_qualification"
            defaultValue={currUserData.highest_education || "education"}
            onBlur={(e) => handleUpdate(e, "highest_education")}
          >
            <StyledOption value="Masters">Masters Degree</StyledOption>
            <StyledOption value="Bachelors">Bachelors Degree</StyledOption>
            <StyledOption value="Intermediate">Intermediate</StyledOption>
            <StyledOption value="HighSchool">HighSchool</StyledOption>
          </StyledSelect>
        </FormRow>
        <FormRow label="Location">
          <StyledInput
            type="text"
            id="location"
            defaultValue={currUserData?.location || "location"}
            onBlur={(e) => handleUpdate(e, "location")}
          />
        </FormRow>
      </Form>
      {/* {true && <MapLocationPicker />} */}
    </>
  );
}
