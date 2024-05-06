import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../features/authentication/UserContext";
import { useGetJobPostingsApiHandler } from "../features/authentication/useGetJobPostingsApiHandler";
import toast from "react-hot-toast";
import { useApplyJobPostingApiHandler } from "../features/authentication/useApplyJobPostingApiHandler";

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
  const { getJobPostings, isLoading: getJobPostsApiLoading } =
    useGetJobPostingsApiHandler();
  const { applyJob, isLoading: applyJobPostsApiLoading } =
    useApplyJobPostingApiHandler();

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
  const applyJobHandler = (jobId) => {
    applyJob(jobId, {
      onSuccess: (data) => {
        const filteredJobs = jobPostings.filter(
          (post) => post.job_id !== data.appliedJobId
        );
        setJobPostings(filteredJobs);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <JobPostingsContainer>
      <h2>Job Postings</h2>
      {getJobPostsApiLoading || applyJobPostsApiLoading ? (
        <p>Loading...</p>
      ) : jobPostings.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        jobPostings?.map((job) => (
          <JobPostingCard key={job.job_id}>
            <JobTitle>{job.title}</JobTitle>
            <JobDescription>{job.description}</JobDescription>
            <CompanyName>Company: {job.company}</CompanyName>
            <Location>Location: {job.currlocation}</Location>
            <Salary>Salary: {parseInt(job.salary) || "Not Disclosed"}</Salary>
            {userData.role === "Client" && (
              <button onClick={() => applyJobHandler(job.job_id)}>Apply</button>
            )}
          </JobPostingCard>
        ))
      )}
    </JobPostingsContainer>
  );
};

export default JobPostings;
