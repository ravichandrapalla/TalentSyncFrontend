/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import SkillSearchTab from "./SkillSearchTab";
import JobPostForm from "./JobPostForm";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  /* justify-content: space-between; */
`;
const TabButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
`;
const TabContentContainer = styled.div`
  display: flex;
  flex: 1;
`;
const TabButton = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#ccc" : "#f0f0f0")};

  border: 1px solid #ccc;
  border-bottom: none;
`;
const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: 20px;
  border: 1px solid #ccc;
  width: 100%;
`;

export default function ClientTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <TabContainer>
      <TabButtonContainer>
        {tabs.map((tab) => (
          <TabButton
            active={tab.id === activeTab}
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabButtonContainer>
      <TabContentContainer>
        {tabs.map((tab) => (
          <TabContent key={`content-${tab.id}`} active={tab.id === activeTab}>
            {tab.id === "skillSearch" ? <SkillSearchTab /> : <JobPostForm />}
          </TabContent>
        ))}
      </TabContentContainer>
    </TabContainer>
  );
}
