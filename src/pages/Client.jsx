/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getClients, getMatchedResumes, jobMatches } from "../services/apiAuth";
import UserContext from "../features/authentication/UserContext";
// import defaultUser from "../images/default-user.jpg";
// import { useDebounce } from "../hooks/useDebounce";
import { FaUser } from "react-icons/fa";
import Spinner from "../ui/Spinner";
import store, { setTab } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbMoodEmpty } from "react-icons/tb";
import SpinnerComponent from "../ui/SpinnerComponent";
import EmptyScreen from "../ui/EmptyScreen";
import MapLocationPicker from "../ui/LocationPicker";
import { SlOptions } from "react-icons/sl";
import { useRevokeUser } from "../features/authentication/useRevokeUser";

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
const SearchSection = styled.section`
  /* display: flex;
  flex-direction: column; */
  padding: 1rem 2rem;
  position: relative;
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  background-color: #070f2b;
`;
const StyledInput = styled.input`
  display: absolute;
  width: 30%;
  border-radius: 2rem;
  border: none;
  outline: none;
  padding: 0.5rem 1.2rem;

  /* background-color: green; */
`;
const SearchSuggestions = styled.ul`
  display: flex;
  flex-direction: column;
  /* background-color: yellow; */
  padding: 0%.5rem;
  transition: 0.5s;
  background-color: #9290c3;
  border-radius: 0 0 1rem 1rem;
`;
const SearchSuggestionsItem = styled.li`
  outline: none;
  /* border-radius: 0.5rem; */
  border-bottom: 2px solid black;
  padding: 0.5rem;
  cursor: pointer;
  color: #fff;
`;
// const NoResult = styled.li`
//   color: red;
//   padding: 0.5rem;
// `;
const ClientArticle = styled.article`
  height: 30%;
  width: 80%;
  background-color: green;
  margin: 2rem auto;
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  column-gap: 4rem;
`;
const UserDetails = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 50%;
  max-width: 50%;
`;
const DownloadableContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;

  justify-content: center;
  align-items: flex-end;
`;
const DownloadResume = styled.a`
  padding: 1rem;
  background-color: black;
  border-radius: 1rem;
  cursor: pointer;
`;
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

const CardContainer = styled.div`
  background-color: orange;
  border-radius: inherit;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5em;

  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: normal;
  align-content: flex-start;
  overflow: hidden;
  column-gap: 1.5rem;
  flex-wrap: wrap;
  position: relative;
`;
const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
  height: 100%;
  /* background-color: pink; */
`;

const Avatar = styled.div`
  border-radius: 100%;
  background-color: #4826f4; /* Green color, you can change it */
  color: #ffffff;
  padding: 1.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  column-gap: 1.5rem;
  width: 70%;
  flex: 1;
`;

const Label = styled.p`
  font-size: larger;
  font-weight: 600;
  font-family: "Outfit Variable", sans-serif;
  padding: 0.5%;
`;

const Value = styled.p`
  /* margin-bottom: 10px; */
  font-size: large;
  font-weight: 400;
  font-family: "Outfit Variable", sans-serif;
`;
const DetailsContainer = styled.article`
  padding: 0.5%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
`;
const NoDataMessageModel = styled.article`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const IconContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 0.5rem;
  position: absolute;
  display: flex;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 15rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.button`
  /* padding: 0.5rem; */

  width: 100%;
  margin: 2px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Client() {
  const [searchText, setSearchText] = useState("");
  const [resumeSearch, setResumeSearch] = useState(false);
  const [foundResults, setFoundResults] = useState([]);
  const [ValidClients, setValidClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(0);
  const userData = useContext(UserContext);
  const storeData = useSelector((state) => state);
  const { revokeUser, isLoading } = useRevokeUser();
  const dispatch = useDispatch();

  useState(() => {
    dispatch(setTab("Client"));
    console.log(store.getState());
  }, []);

  useEffect(() => {
    let timeOutId;
    console.log("useEffect ---> searching for suggestion");
    if (searchText && !resumeSearch) {
      console.log("useEffect ---> suggestion api calling");
      timeOutId = setTimeout(() => {
        jobMatches(searchText)
          .then((results) => {
            setFoundResults(results);
            setResumeSearch(false);
          })
          .catch((err) => err);
      }, 2000);
    } else {
      setFoundResults([]);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchText]);

  useEffect(() => {
    console.log("useEffect ---> getting resumes");
    if (resumeSearch) {
      console.log("useEffect ---> getting resumes --> api called");
      getMatchedResumes(searchText)
        .then((users) => {
          setValidClients(users);
          setResumeSearch(false);
        })
        .catch((err) => toast.error(err.message));
    }
  }, [resumeSearch]);
  useEffect(() => {
    console.log("use ris ----> ", userData.role);
    if (userData?.role === "Admin") {
      setLoading(true);
      getClients()
        .then(({ message, clients }) => {
          // console.log("raw response ", response);
          if (clients.length > 0) {
            setClients(clients);
            toast.success(`Found ${clients.length} Clients`);
          } else {
            setClients([]);
            toast.error(message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleExactSearch = (suggestion) => {
    setSearchText(suggestion);
    setResumeSearch(true);
  };
  const handleOptionDropDown = (regId) => {
    if (isOpen && isOpen === regId) {
      setIsOpen(0);
    } else {
      setIsOpen(regId);
    }
  };
  const ClientCard = ({ client }) => {
    return (
      <CardContainer>
        <IconContainer
          onClick={() => handleOptionDropDown(client.registration_number)}
        >
          <SlOptions />
          <DropdownMenu isOpen={isOpen === client.registration_number}>
            <DropdownItem onClick={() => revokeUser(client.id)}>
              DeActivate User
            </DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </DropdownMenu>
        </IconContainer>
        <AvatarContainer>
          <Avatar>
            {client.image ? (
              <img src={client.image} alt="Client" />
            ) : (
              <FaUser size={80} />
            )}
          </Avatar>
        </AvatarContainer>

        <InfoContainer>
          {/* <SectionHeader>Personal Information</SectionHeader> */}
          <DetailsContainer>
            <Label>Registration Number:</Label>
            <Value>{client.registration_number}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Username:</Label>
            <Value>{client.username}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Organization:</Label>
            <Value>{client.organization || "Unknown Organization"}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Mobile Number:</Label>
            <Value>{client.mobile_number}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Email:</Label>
            <Value>{client.email}</Value>
          </DetailsContainer>
        </InfoContainer>
      </CardContainer>
    );
  };

  return loading ? (
    <SpinnerComponent />
  ) : (
    <StyledSection>
      {userData.role === "Admin" &&
        (clients.length === 0 ? (
          <EmptyScreen />
        ) : (
          <>
            {clients.map((client) => (
              <ClientCard key={client.registration_number} client={client} />
            ))}
          </>
        ))}
      {userData.role === "Client" && <MapLocationPicker />}
    </StyledSection>
  );
}
