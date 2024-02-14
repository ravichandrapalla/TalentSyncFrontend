import { useEffect, useState } from "react";
import styled from "styled-components";
import { jobMatches } from "../services/apiAuth";

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
`;

export default function Recruiter() {
  const [searchText, setSearchText] = useState("");
  const [foundResults, setFoundResults] = useState([]);
  useEffect(() => {
    jobMatches(searchText)
      .then((resp) => console.log("resp ---->", resp))
      .catch((err) => err);
  }, [searchText]);
  return (
    <StyledSection>
      <SearchSection>
        <StyledInput
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
        {foundResults.length > 0 && (
          <SearchSuggestions>
            {foundResults.map((suggestion) => (
              <SearchSuggestionsItem key={suggestion}>
                {suggestion}
              </SearchSuggestionsItem>
            ))}
          </SearchSuggestions>
        )}
      </SearchSection>
    </StyledSection>
  );
}
