import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  getMatchedResumes,
  getRecruiters,
  jobMatches,
} from "../services/apiAuth";
import UserContext from "../features/authentication/UserContext";
// import { useDebounce } from "../hooks/useDebounce";

const StyledSection = styled.section`
  min-height: 100%;
  max-width: 90%;
  background-color: grey;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
const NoResult = styled.li`
  color: red;
  padding: 0.5rem;
`;
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
import Spinner from "../ui/Spinner";

export default function Recruiter() {
  const [searchText, setSearchText] = useState("");
  const [resumeSearch, setResumeSearch] = useState(false);
  const [foundResults, setFoundResults] = useState([]);
  const [ValidClients, setValidClients] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useContext(UserContext);

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
        .catch((err) => console.log(err));
    }
  }, [resumeSearch]);
  useEffect(() => {
    console.log("use ris ----> ", userData.role);
    if (userData?.role === "Admin") {
      setLoading(true);
      getRecruiters()
        .then((data) => {
          console.log("api data us ", data);
          if (data.length > 0) {
            setRecruiters(data);
            console.log("setting recruiters-----> ,", data);
          }
        })
        .catch((err) => {
          throw new Error(err);
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

  return loading ? (
    <SpinnerBackground>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    </SpinnerBackground>
  ) : userData.role === "Admin" ? (
    <>
      <StyledSection>
        {recruiters.map((rec) => (
          <div key={rec.email}>
            <p>{rec.email}</p>
            <p>{rec.role}</p>
          </div>
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
