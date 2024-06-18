import { useState } from "react";
import SpinnerComponent from "../ui/SpinnerComponent";
import styled from "styled-components";
import ClientTabs from "../components/ClientTabs";

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 2.5rem;

  /* border-radius: 1rem; */
`;
// const ClinetTabContainer = styled.div`
//   height: 100%;
//   width: 100%;
//   padding: 1rem;
//   margin: 1rem;
//   background-color: white;
//   border-radius: 1rem;
// `;
const tabs = [
  { id: "skillSearch", title: "Search by Skill", content: "Content of Tab 1" },
  { id: "postJob", title: "Post a Job", content: "Content of Tab 2" },
];
export default function FindClients() {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <SpinnerComponent />
  ) : (
    <StyledSection>
      <ClientTabs tabs={tabs} />
    </StyledSection>
  );
}
