/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  getMatchedResumes,
  getRecruiters,
  jobMatches,
} from "../services/apiAuth";
import UserContext from "../features/authentication/UserContext";
// import defaultUser from "../images/default-user.jpg";
// import { useDebounce } from "../hooks/useDebounce";
import { FaUserTie } from "react-icons/fa";
import Spinner from "../ui/Spinner";
import store, { setTab } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbMoodEmpty } from "react-icons/tb";
import SpinnerComponent from "../ui/SpinnerComponent";

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
`;

const Avatar = styled.div`
  border-radius: 100%;
  background-color: #52b788; /* Green color, you can change it */
  color: #ffffff;
  padding: 1.5rem;
  /* font-size: 1.5em; */
`;
const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
  height: 100%;
  /* background-color: pink; */
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  column-gap: 1.5rem;
  width: 70%;
  /* background-color: violet; */
  flex: 1;
`;

const Label = styled.p`
  /* margin-bottom: 5px; */
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
  /* border: 1px solid grey; */
  /* min-width: 14em; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
`;
const SectionHeader = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const NoDataMessageModel = styled.article`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Recruiter() {
  const [searchText, setSearchText] = useState("");
  const [resumeSearch, setResumeSearch] = useState(false);
  const [foundResults, setFoundResults] = useState([]);
  const [ValidClients, setValidClients] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useContext(UserContext);
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTab("Recruiter"));
    console.log(store.getState());
  }, []);

  // useEffect(() => {
  //   let timeOutId;
  //   console.log("useEffect ---> searching for suggestion");
  //   if (searchText && !resumeSearch) {
  //     console.log("useEffect ---> suggestion api calling");
  //     timeOutId = setTimeout(() => {
  //       jobMatches(searchText)
  //         .then((results) => {
  //           setFoundResults(results);
  //           setResumeSearch(false);
  //         })
  //         .catch((err) => err);
  //     }, 2000);
  //   } else {
  //     setFoundResults([]);
  //   }
  //   return () => {
  //     clearTimeout(timeOutId);
  //   };
  // }, [searchText]);

  // useEffect(() => {
  //   console.log("useEffect ---> getting resumes");
  //   if (resumeSearch) {
  //     console.log("useEffect ---> getting resumes --> api called");
  //     getMatchedResumes(searchText)
  //       .then((users) => {
  //         setValidClients(users);
  //         setResumeSearch(false);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [resumeSearch]);
  useEffect(() => {
    console.log("use ris ----> ", userData.role);
    if (userData?.role === "Admin") {
      setLoading(true);
      getRecruiters()
        .then(({ message, recruiters }) => {
          if (recruiters.length > 0) {
            setRecruiters(recruiters);
            toast.success(`Found ${recruiters.length} Recruiters`);
          } else {
            setRecruiters([]);
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
  const RecruiterCard = ({ recruiter }) => {
    return (
      <CardContainer>
        <AvatarContainer>
          <Avatar>
            {recruiter.image ? (
              <img src={recruiter.image} alt="Recruiter" />
            ) : (
              <FaUserTie size={80} />
            )}
          </Avatar>
        </AvatarContainer>

        <InfoContainer>
          {/* <SectionHeader>Personal Information</SectionHeader> */}
          <DetailsContainer>
            <Label>Registration Number:</Label>
            <Value>{recruiter.registration_number}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Username:</Label>
            <Value>{recruiter.username}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Organization:</Label>
            <Value>{recruiter.organization || "Unknown Organization"}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Mobile Number:</Label>
            <Value>{recruiter.mobile_number}</Value>
          </DetailsContainer>
          <DetailsContainer>
            <Label>Email:</Label>
            <Value>{recruiter.email}</Value>
          </DetailsContainer>
        </InfoContainer>
      </CardContainer>
    );
  };

  return loading ? (
    <SpinnerComponent />
  ) : recruiters.length === 0 ? (
    <NoDataMessageModel>
      <TbMoodEmpty size={100} color="tomato" />
      <p>Oops!.. No data Found</p>
    </NoDataMessageModel>
  ) : userData.role === "Admin" ? (
    <>
      <StyledSection>
        {recruiters.map((recruiter) => (
          <RecruiterCard
            key={recruiter.registration_number}
            recruiter={recruiter}
          />
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
