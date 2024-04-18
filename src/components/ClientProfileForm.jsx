import { useContext, useEffect, useState } from "react";
import useClientProfile from "../features/authentication/useClientProfile";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";
import UserContext from "../features/authentication/UserContext";
import SpinnerComponent from "../ui/SpinnerComponent";
import useUserUpToDateDetails from "./../features/authentication/useUserUptodateDetails";
import toast from "react-hot-toast";

export default function ClientProfileForm() {
  //   const userData = useContext(UserContext);
  const [currUserData, setCurrUserData] = useState({});

  console.log("component rendering");
  const { getUptoDateDetails, isLoading: getReqLoading } =
    useUserUpToDateDetails();
  const { updateProfile, isLoading: setReqLoading } = useClientProfile();

  const handleUpdate = (e, field) => {
    // e.stopPropagation();
    // e.preventDefault();
    const { value } = e.target;
    console.log("compare --> ", value, currUserData[field]);
    if (!value || value === currUserData[field]) return;
    updateProfile(
      { [field]: value },
      {
        onSuccess: ({ message, updatedRecord }) => {
          toast.success("Profile Updated Successfully");
          setCurrUserData(updatedRecord[0]);
        },
        onError: (err) => {
          toast.error(err || err.message);
        },
      }
    );
  };
  useEffect(() => {
    getUptoDateDetails(
      {},
      {
        onSuccess: ({ updatedRecord }) => {
          setCurrUserData(updatedRecord);
          // toast.success("Profile Updated Successfully");
          console.log("seeting data ", updatedRecord);
        },
        onError: (err) => {
          toast.error(err || err.message);
        },
      }
    );
  }, []);
  // const setReqLoading = false;
  // const handleUpdate = (e, str) => {
  //   console.log("handle clied");
  // };

  return setReqLoading || getReqLoading ? (
    <SpinnerComponent />
  ) : (
    <Form>
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
          disabled={setReqLoading || getReqLoading}
          defaultValue={currUserData.username}
          onBlur={(e) => handleUpdate(e, "username")}
        />
      </FormRow>
      <FormRow label="Email">
        <StyledInput
          type="email"
          id="email"
          disabled={setReqLoading || getReqLoading}
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
          disabled={setReqLoading || getReqLoading}
          defaultValue={currUserData.mobile_number}
          onBlur={(e) => handleUpdate(e, "mobile_number")}
        />
      </FormRow>
      {/* <FormRow label="Location">
        <StyledInput
          type="text"
          id="location"
          disabled={isLoading}
          defaultValue={userData?.location || "location"}
          onBlur={(e)=> handleUpdate(e, 'location') }
        />
      </FormRow> */}
      <FormRow label="Organization">
        <StyledInput
          type="text"
          id="organization"
          disabled={setReqLoading || getReqLoading}
          defaultValue={currUserData.organization}
          onBlur={(e) => handleUpdate(e, "organization")}
        />
      </FormRow>
      {/* <FormRow label="Experience (In Years)">
        <StyledInput
          type="number"
          id="experience"
          disabled={setReqLoading}
          defaultValue={currUserData.experience || "2"}
          onBlur={(e) => handleUpdate(e, "experience")}
        />
      </FormRow>
      <FormRow label="Education">
        <StyledInput
          type="text"
          id="education"
          disabled={setReqLoading}
          defaultValue={currUserData.education || "education"}
          onBlur={(e) => handleUpdate(e, "education")}
        />
      </FormRow> */}

      {/* <UpdateButton>Edit Profile</UpdateButton> */}
    </Form>
  );
}
