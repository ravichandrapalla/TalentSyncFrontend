/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import ClientProfileForm from "../components/ClientProfileForm";

const StyledSection = styled.section`
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    color: #333;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const AvatarContainer = styled.div`
  margin-right: 2rem;
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
`;

const UploadButton = styled.label`
  display: block;
  margin-top: 1rem;
  cursor: pointer;

  input[type="file"] {
    display: none;
  }
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

const ProfileView = ({ userData }) => {
  return (
    <StyledSection>
      <ProfileHeader>
        <h2>My Profile</h2>
      </ProfileHeader>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar>
            {/* Display user image */}
            {userData?.image ? (
              <img src={userData.image} alt="User" />
            ) : (
              <FaUser size={80} />
            )}
          </Avatar>
          <UploadButton>
            <label htmlFor="resume-upload">Upload Resume</label>
            <input type="file" id="resume-upload" accept=".pdf,.docx,.doc" />
          </UploadButton>
        </AvatarContainer>
        <ClientProfileForm />
      </ProfileContainer>
    </StyledSection>
  );
};

export default ProfileView;
