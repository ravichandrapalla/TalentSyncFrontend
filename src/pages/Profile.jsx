/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import ClientProfileForm from "../components/ClientProfileForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUserUpToDateDetails from "../features/authentication/useUserUptodateDetails";
import useClientProfile from "../features/authentication/useClientProfile";
import SpinnerComponent from "../ui/SpinnerComponent";
import Button from "../ui/Button";
import { getCitiesForCountry } from "../services/apiAuth";
import { createClient } from "@supabase/supabase-js";
import useAvatarManager from "../features/authentication/avatarManager";
import "../../src/App.css";

const StyledSection = styled.section`
  height: 100%;
  width: 90%;
  /* background-color: grey; */
  overflow: auto;
  display: flex;
  row-gap: 2.5rem;
  flex-direction: column;
  /* padding: 2rem;
  margin: auto; */
  border-radius: 1rem;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 4rem;
    color: #333;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  /* align-items: flex-start; */
  justify-content: space-between;
  width: 100%;
  height: 80%;
`;

const AvatarContainer = styled.div`
  margin-right: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 4rem;
  width: 30%;
  background-color: grey;
  overflow: hidden;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 4rem;
`;

const UploadButton = styled.label`
  display: block;
  margin: 1rem;

  /* background-color: green; */
  input[type="file"] {
    display: none;
  }
  cursor: pointer;
`;

const ProfileDetails = styled.div`
  flex: 1;
`;

const DetailItem = styled.div`
  margin-bottom: 1rem;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span`
  margin-left: 1rem;
`;

const UpdateButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
const FormContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  background-color: brown;
  overflow: auto;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: 1rem;
`;
const FileInput = styled.input.attrs({ type: "file" })`
  padding: 0.5rem;
  margin: 0.5rem;
  width: 100px;
  overflow: hidden;
`;

const ProfileView = () => {
  const [currUserData, setCurrUserData] = useState({});
  const [availableCities, setAvailableCities] = useState([]);
  const [localAPiLoading, setLocalApiLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { updateUserAvatarManager, isLoading } = useAvatarManager();

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
  const handleUploadAvatar = (e, regNumber) => {
    setAvatar(e.target.files[0]);
    const newAvatar = e.target.files[0];
    if (!e.target.files[0]) {
      return;
    }
    console.log("data ios ", regNumber);
    updateUserAvatarManager(
      { newAvatar, regNumber },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (err) => {
          console.log(err);
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
    setLocalApiLoading(true);
    getCitiesForCountry("india")
      .then(({ data }) => {
        setAvailableCities(data.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setLocalApiLoading(false);
      });
  }, []);

  return getReqLoading || setReqLoading || localAPiLoading ? (
    <SpinnerComponent />
  ) : (
    <StyledSection>
      <ProfileHeader>
        <h2>My Profile</h2>
      </ProfileHeader>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar>
            {/* Display user image */}
            {currUserData?.avatar_url ? (
              <img src={currUserData.avatar_url} alt="User" />
            ) : (
              <FaUser size={80} />
            )}
          </Avatar>
          <ButtonsContainer>
            <div
              style={{
                display: "flex",
                padding: "0.5rem",
                alignItems: "center",
              }}
            >
              <label htmlFor="avatar">Your Avatar</label>
              <FileInput
                id="avatar"
                accept="image/*"
                onChange={(e) =>
                  handleUploadAvatar(e, currUserData.registration_number)
                }
              />
            </div>

            <UploadButton>
              <label style={{ cursor: "inherit" }} htmlFor="resume-upload">
                Upload Resume
              </label>
              <FileInput
                id="resume-upload"
                accept=".pdf,.docx,.doc"
                onChange={(e) => {
                  "";
                }}
              />
              {/* <input type="file" id="resume-upload" accept=".pdf,.docx,.doc" /> */}
            </UploadButton>
          </ButtonsContainer>
        </AvatarContainer>
        <FormContainer>
          <ClientProfileForm
            handleUpdate={handleUpdate}
            currUserData={currUserData}
            availableCities={availableCities}
          />
        </FormContainer>
      </ProfileContainer>
    </StyledSection>
  );
};

export default ProfileView;
