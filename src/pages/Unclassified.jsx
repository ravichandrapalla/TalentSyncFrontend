/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import {
  approveUser,
  getAllUsers,
  rejectUser,
  uploadResume,
} from "../services/apiAuth";
import toast from "react-hot-toast";
import styled, { css } from "styled-components";
import DefaultProfileImage from "../images/default-user.jpg";
import Button from "../ui/Button";
// import Spinner from "./../ui/Spinner";
import UserContext from "../features/authentication/UserContext";
import { RiFileUserFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setTab } from "../redux/store";
import MyModal from "../ui/MyModal";
import SpinnerComponent from "../ui/SpinnerComponent";
import EditModal from "../ui/EditModal";
import EditForm from "../components/EditForm";

// const SpinnerBackground = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   background: transparent;
//   background-color: rgba(219, 214, 217, 0.2);
//   backdrop-filter: blur(5px);
// `;

// const SpinnerContainer = styled.section`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

// const StyledSection = styled.section`
//   min-height: 100%;
//   max-width: 90%;
//   background-color: grey;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   margin: auto;
// `;
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
// const ButtonContainer = styled.section`
//   margin: 0 1rem;
//   max-width: 300px;
//   max-height: 100%;
//   display: flex;
//   /* row-gap: 2rem;
//   column-gap: 1rem; */
//   flex-direction: column;
//   background-color: maroon;
//   border-radius: 1rem;
//   overflow: hidden;
//   box-sizing: border-box;
// `;
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
const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 0.5em;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 3rem;
  font-weight: bold;
`;

const UserOrganization = styled.span`
  margin-top: 5px;
  color: #666;
`;

const UserRegistrationNumber = styled.span`
  margin-top: 10px;
`;

const UserRole = styled.span`
  margin-top: 5px;
`;

const UserEmail = styled.span`
  margin-top: 5px;
`;

const UserVerified = styled.span`
  margin-top: 5px;
`;
const ButtonContainer = styled.div`
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1em;
  width: 12%;
`;

const ButtonNew = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => {
    if (props.verified) {
      switch (props.type) {
        case "view":
          return "#007bff";
        case "approve":
          return "#58A399";
        case "reject":
          return "#E72929";
        case "edit":
          return "#B3C8CF";
        default:
          return "brown";
      }
    } else {
      switch (props.type) {
        case "view":
          return "#007bff";
        case "reject":
          return "#E72929";
        case "edit":
          return "#B3C8CF";
        default:
          return "grey";
      }
    }
  }};
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const ImageCumDetailContainer = styled.div`
  display: flex;
  gap: 5rem;
`;

export default function Unclassified() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(false);
  const userData = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTab("Unclassified"));
    setLoading(true);
    getAllUsers()
      .then(({ message, users }) => {
        if (users && users.length === 0) {
          setData([]);
          toast.error("No Data Found");
        } else {
          setData(users);
          toast.success(`Found ${users.length} Users`);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleApprove = (regNumber) => {
    setLoading(true);
    approveUser(regNumber)
      .then((message) => {
        toast.success(message);

        getAllUsers()
          .then(({ message, users }) => {
            if (users?.length === 0) {
              setData([]);
              toast.error("No Data Found");
            } else {
              setData(users);
              toast.success(`Found ${users.length} Users`);
            }
          })
          .catch((err) => toast.error(err.message))
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  };
  const handleReject = (regNumber) => {
    setLoading(true);
    rejectUser(regNumber)
      .then((message) => {
        console.log("response4 message", message);

        getAllUsers()
          .then(({ message, users }) => {
            if (users?.length === 0) {
              setData([]);
              toast.error("No Data Found");
            } else {
              setData(users);
              toast.success(`Found ${users.length} Users`);
            }
          })
          .catch((err) => toast.error(err.message))
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  };

  const handleUpload = (e, regId) => {
    let formData = new FormData();
    console.log("e-> ", e);
    formData.append("resume", e.target.files[0]);
    console.log("e2-> ", e.target.files[0]);
    console.log("e3-> ", formData, typeof formData);
    uploadResume(formData, regId)
      .then((resp) => console.log("api resp -> ", resp))
      .catch((err) => console.log(err));
  };
  const handleView = (regId) => {
    setIsOpen(!isOpen);
  };
  const handleEdit = (user) => {
    if (selectedUser.username) {
      setSelectedUser({});
    } else {
      setSelectedUser(user);
    }
    setEditModalVisible((visible) => !visible);
  };

  const updateLocalData = (message, updatedTarget) => {
    const updatedLocalData = data.map((user) => {
      if (user.registration_number === updatedTarget[0].registration_number) {
        return updatedTarget[0];
      } else {
        return user;
      }
    });
    setData(updatedLocalData);
  };

  const UserCard = ({ user }) => {
    return (
      <Card>
        <CardContent>
          <ImageCumDetailContainer>
            <RiFileUserFill size={100} />
            <UserInfo>
              <UserName>{user.username}</UserName>
              <UserRegistrationNumber>
                Registration Number: {user.registration_number}
              </UserRegistrationNumber>
              <UserOrganization>
                Organization: {user.organization || "Null"}
              </UserOrganization>
              <UserEmail>Email: {user.email}</UserEmail>
              <UserRole>Requested Role: {user.role}</UserRole>
              <UserVerified>
                Mail Verified: {user.verified ? "Yes" : "No"}
              </UserVerified>
            </UserInfo>
          </ImageCumDetailContainer>

          <ButtonContainer>
            <ButtonNew
              onClick={() => {
                setSelectedUser(user);
                handleView(user.registration_number);
              }}
              type="view"
              verified={user.verified}
            >
              More
            </ButtonNew>
            {user.verified && (
              <ButtonNew
                onClick={() => handleApprove(user.registration_number)}
                type="approve"
                verified={user.verified}
                disabled={!user.verified}
              >
                Approve
              </ButtonNew>
            )}

            <ButtonNew
              onClick={() => handleReject(user.registration_number)}
              type="reject"
              verified={user.verified}
            >
              Reject
            </ButtonNew>
            <ButtonNew
              onClick={() => {
                handleEdit(user);
              }}
              type="edit"
              verified={user.verified}
            >
              Edit
            </ButtonNew>
          </ButtonContainer>
        </CardContent>
      </Card>
    );
  };
  return loading ? (
    <SpinnerComponent />
  ) : userData.role === "Admin" ? (
    data?.length === 0 ? (
      <p>No Data Found</p>
    ) : (
      <StyledSection>
        {<MyModal isOpen={isOpen} onClose={handleView} user={selectedUser} />}
        {
          <EditForm
            isOpen={editModalVisible}
            onClose={() => handleEdit()}
            user={selectedUser}
            updateLocalData={({ message, updatedRecord }) =>
              updateLocalData(message, updatedRecord)
            }
          />
        }
        {data?.map((user) => (
          <UserCard user={user} key={user.registration_number} />
        ))}
      </StyledSection>
    )
  ) : (
    <StyledSection>
      {/* {data?.map((user) => (
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
              <input
                type="file"
                name="resume"
                placeholder="Upload a file"
                onChange={(e) => handleUpload(e, user.registration_number)}
              />
              <StyledButton type="Resume">View Resume</StyledButton>
              <StyledButton type="Resume">View Resume</StyledButton>
            </ButtonContainer>
          </>

         
        </StyledArticle>
      ))} */}
      You are Not Authorized to access this page
    </StyledSection>
  );
}
