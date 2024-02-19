import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMatchedResumes, jobMatches } from "../services/apiAuth";
import { saveAs } from "file-saver";

const StyledSection = styled.section`
  min-height: 100%;
  max-width: 90%;
  background-color: grey;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: auto;
`;
const SearchSection = styled.section`
  /* display: flex;
  flex-direction: column; */
  padding: 0.5rem;
  position: relative;
  width: 30rem;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
const StyledInput = styled.input`
  display: absolute;
  /* background-color: green; */
`;
const SearchSuggestions = styled.ul`
  display: flex;
  flex-direction: column;
  /* background-color: yellow; */
  padding: 0%.5rem;
  transition: 0.5s;
`;
const SearchSuggestionsItem = styled.li`
  outline: none;
  /* border-radius: 0.5rem; */
  border-bottom: 2px solid black;
  padding: 0.5rem;
  cursor: pointer;
`;
const ClientArticle = styled.article`
  height: 200px;
  width: 600px;
`;

export default function Recruiter() {
  const [searchText, setSearchText] = useState("");
  const [resumeSearch, setResumeSearch] = useState(false);
  const [foundResults, setFoundResults] = useState([]);
  const [ValidClients, setValidClients] = useState([]);

  useEffect(() => {
    if (searchText && !resumeSearch) {
      jobMatches(searchText)
        .then((results) => {
          setFoundResults(results);
        })
        .catch((err) => err);
    } else {
      setFoundResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    getMatchedResumes(searchText)
      .then((users) => setValidClients(users))
      .catch((err) => console.log(err));
  }, [resumeSearch]);

  const handleExactSearch = (suggestion) => {
    setSearchText(suggestion);
    setResumeSearch(true);
  };
  const handleResumeDownload = (b64str) => {
    console.log("base64", b64str);
    const binaryData = atob(b64str);
    const blob = new Blob([binaryData], { type: "application/pdf" });
    // Use FileSaver to trigger a file download
    saveAs(blob, "resume.pdf");
  };
  return (
    <StyledSection>
      <SearchSection>
        <StyledInput
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {foundResults.length > 0 && (
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
          <p>{client.username}</p>
          <p>{client.email}</p>
          <p>{client.mobile_number}</p>
          {/* <button onClick={() => handleResumeDownload(client.resume)}>
            Download Resume
          </button> */}
          {/* <embed src={`data:application/pdf;base64,${client.resume}`} /> */}
          <a
            href={`data:application/pdf;base64,${client.resume}`}
            download="download.pdf"
          >
            Download Resume
          </a>
        </ClientArticle>
      ))}
    </StyledSection>
  );
}
