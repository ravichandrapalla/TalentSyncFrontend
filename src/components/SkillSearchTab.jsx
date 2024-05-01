import { useState, useEffect } from "react";
import styled from "styled-components";
import { getMatchedResumes, jobMatches } from "../services/apiAuth";
import toast from "react-hot-toast";
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

export default function SkillSearchTab() {
  const [searchText, setSearchText] = useState("");
  const [resumeSearch, setResumeSearch] = useState(false);
  const [foundResults, setFoundResults] = useState([]);
  const [ValidClients, setValidClients] = useState([]);
  const handleExactSearch = (suggestion) => {
    console.log("handle resume search called");
    setSearchText(suggestion);
    setResumeSearch(true);
  };
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
      setFoundResults([]);
      getMatchedResumes(searchText)
        .then((users) => {
          setValidClients(users);
          setResumeSearch(false);
        })
        .catch((err) => toast.error(err.message));
    }
  }, [resumeSearch]);
  return (
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
              href={client.resume_url}
              target="_blank"
              // download="download.pdf"
            >
              Download Resume
            </DownloadResume>
          </DownloadableContainer>
        </ClientArticle>
      ))}
    </StyledSection>
  );
}
