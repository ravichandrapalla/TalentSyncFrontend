import { useState, useEffect } from "react";
import { getAllUsers } from "../services/apiAuth";
import toast from "react-hot-toast";
import styled, { css } from "styled-components";
import DefaultProfileImage from "../images/default-user.jpg";
import Button from "../ui/Button";
import Spinner from "./../ui/Spinner";

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

const StyledSection = styled.section`
  min-height: 100%;
  max-width: 90%;
  background-color: grey;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const StyledArticle = styled.article`
  display: flex;
  /* grid-row-gap: 1rem 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.5fr 1fr; */
  justify-content: space-between;
  background-color: burlywood;
  color: white;
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem;
`;
const ProfileContainer = styled.article`
  display: flex;
  /* flex-wrap: nowrap; */
  white-space: nowrap;
  column-gap: 2rem;
  min-width: 400px;
  max-width: 450px;
  border-radius: 1rem;
  background-color: #00ffff;
  padding: 1rem;
`;
const ProfileDeatilsContainer = styled.article`
  display: flex;
  row-gap: 1.5rem;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 1rem;
  overflow: hidden;
  object-fit: cover;
`;
const ButtonContainer = styled.section`
  margin: 0 1rem;
  max-width: 300px;
  max-height: 100%;
  display: flex;
  /* row-gap: 2rem;
  column-gap: 1rem; */
  flex-direction: column;
  background-color: maroon;
  border-radius: 1rem;
  overflow: hidden;
  box-sizing: border-box;
`;
const StyledButton = styled.button`
  ${(props) =>
    props.type === "Resume" &&
    css`
      color: white;
      background-color: green;
      border: none;
      outline: none;
      padding: 0.5rem;
      margin: 0.5rem;
      border-radius: 1rem;
    `}
`;
const SiteDataContainer = styled.section`
  background-color: yellow;
  color: black;
`;

const StyledUserName = styled.p`
  font-weight: 400;

  color: white;
`;
const StyledEmail = styled.p`
  font-weight: 300;
  color: tomato;
`;
const StyledRole = styled.p`
  font-weight: 300;
  color: green;
`;
const StyledRegNo = styled.p`
  font-weight: 300;
  color: grey;
`;

export default function AllUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // getCurrentUser()
    //   .then((data) => setData(data))
    //   .catch((err) => toast.error(err));

    getAllUsers()
      .then((users) => {
        setData(users);
        setLoading(!loading);
      })
      .catch((err) => toast.error(err));
  }, []);
  return loading ? (
    <SpinnerBackground>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    </SpinnerBackground>
  ) : (
    <StyledSection>
      {data?.map((user) => (
        <StyledArticle key={user.registration_number}>
          <>
            <ProfileContainer>
              <ImageContainer>
                <img
                  src={user?.image || DefaultProfileImage}
                  alt="user profile image"
                  width={100}
                  style={{ objectFit: "cover" }}
                />
              </ImageContainer>
              <ProfileDeatilsContainer>
                <StyledUserName>Applicant : {user.username}</StyledUserName>
                <StyledEmail>Mail : {user.email}</StyledEmail>
              </ProfileDeatilsContainer>
            </ProfileContainer>
            <ButtonContainer>
              <StyledButton type="Resume">View Resume</StyledButton>
              <StyledButton type="Resume">View Resume</StyledButton>
              <StyledButton type="Resume">View Resume</StyledButton>
            </ButtonContainer>
          </>

          {/* <SiteDataContainer>
        {user.role_id && <StyledRole>{data["0"].role_id}</StyledRole>}

        <StyledRegNo>{user.registration_number}</StyledRegNo>
      </SiteDataContainer> */}
        </StyledArticle>
      ))}
    </StyledSection>
  );
}
