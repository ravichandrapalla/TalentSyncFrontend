import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../features/authentication/UserContext";
import { useGetJobPostingsApiHandler } from "../features/authentication/useGetJobPostingsApiHandler";
import toast from "react-hot-toast";

const JobPostingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const JobPostingCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 600px;
`;

const JobTitle = styled.h3`
  margin-bottom: 10px;
`;

const JobDescription = styled.p`
  margin-bottom: 10px;
`;

const CompanyName = styled.p`
  margin-bottom: 10px;
`;

const Location = styled.p`
  margin-bottom: 10px;
`;

const Salary = styled.p`
  margin-bottom: 10px;
`;

const JobPostings = () => {
  const userData = useContext(UserContext);
  const { getJobPostings, isLoading } = useGetJobPostingsApiHandler();

  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    getJobPostings(
      {},
      {
        onSuccess: ({ message, jobPosts }) => {
          toast.success(message);
          setJobPostings(jobPosts);
        },
      }
    );
  }, []);

  return (
    <JobPostingsContainer>
      <h2>Job Postings</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : jobPostings.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        jobPostings?.map((job) => (
          <JobPostingCard key={job.id}>
            <JobTitle>{job.title}</JobTitle>
            <JobDescription>{job.description}</JobDescription>
            <CompanyName>Company: {job.company}</CompanyName>
            <Location>Location: {job.currlocation}</Location>
            <Salary>Salary: {parseInt(job.salary) || "Not Disclosed"}</Salary>
          </JobPostingCard>
        ))
      )}
    </JobPostingsContainer>
  );
};

export default JobPostings;
