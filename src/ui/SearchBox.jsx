/* eslint-disable react/prop-types */
import styled from "styled-components";

const SearchBoxUi = styled.input`
  width: 20%;
  height: auto;
  outline: none;
  padding: 0.5em 1em;
  border: 1px solid #f2613f;

  border-radius: 2em;
`;

export default function SearchBox() {
  return (
    <SearchBoxUi type="text" placeholder="Enter Search Text..."></SearchBoxUi>
  );
}
