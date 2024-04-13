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

const StyledSection = styled.section`
  min-height: 100%;
  max-width: 90%;
  /* background-color: grey; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: auto;
  border-radius: 4px;
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
  background-color: #07fbeb;
  border-radius: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  overflow: hidden;
  gap: 1rem;
  /* flex-wrap: wrap; */
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background-color: #4826f4; /* Green color, you can change it */
  color: #ffffff;
  font-size: 24px;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Label = styled.p`
  /* margin-bottom: 5px; */
  font-size: larger;
  font-weight: 600;
  font-family: "Outfit Variable", sans-serif;
  padding: 0%.5;
`;

const Value = styled.p`
  /* margin-bottom: 10px; */
  font-size: large;
  font-weight: 400;
  font-family: "Outfit Variable", sans-serif;
`;
const DetailsContainer = styled.article`
  padding: 0.5%;
  /* border: 1px solid grey; */
  min-width: 14em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  overflow: hidden;
`;
const NoDataMessageModel = styled.article`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Client() {
  const [searchText, setSearchText] = useState("");
  const [resumeSearch, setResumeSearch] = useState(false);
  const [foundResults, setFoundResults] = useState([]);
  const [ValidClients, setValidClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useContext(UserContext);
  const storeData = useSelector((state) => state);
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
  const ClientCard = ({ client }) => {
    return (
      <CardContainer>
        <Avatar>
          {client.image ? (
            <img src={client.image} alt="Client" />
          ) : (
            <FaUser size={80} />
          )}
        </Avatar>
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
  ) : clients.length === 0 ? (
    <NoDataMessageModel>
      <TbMoodEmpty size={100} color="tomato" />
      <p>Oops!.. No data Found</p>
    </NoDataMessageModel>
  ) : userData.role === "Admin" ? (
    <>
      <StyledSection>
        {clients.map((client) => (
          <ClientCard key={client.registration_number} client={client} />
        ))}
      </StyledSection>
    </>
  ) : (
    <StyledSection>
      <SearchSection>
        <StyledInput
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          placeholder="Search with Skills"
        />
        {searchText && foundResults?.length > 0 && (
          <SearchSuggestions>
            {foundResults.map((suggestion) => (
              <SearchSuggestionsItem
                key={suggestion}
                onClick={() => handleExactSearch(suggestion)}
              >
                {suggestion}
              </SearchSuggestionsItem>
            ))}
          </SearchSuggestions>
        )}
      </SearchSection>
      {ValidClients?.map((client) => (
        <ClientArticle key={client.email}>
          <UserDetails>
            <p>{`Name : ${client.username}`}</p>
            <p>{`Email : ${client.email}`}</p>
            <p>{`Mobile : ${client.mobile_number}`}</p>
          </UserDetails>

          {/* <embed src={`data:application/pdf;base64,${client.resume}`} /> */}
          <DownloadableContainer>
            <DownloadResume
              href={`data:application/pdf;base64,${client.resume}`}
              download="download.pdf"
            >
              Download Resume
            </DownloadResume>
          </DownloadableContainer>
        </ClientArticle>
      ))}
    </StyledSection>
  );
}
