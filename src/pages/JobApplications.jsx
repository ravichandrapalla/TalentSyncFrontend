import { useEffect, useState } from "react";
import { useGetJobApplicationsApiHandler } from "../features/authentication/useGetJobApplicationsApiHandler";
import styled from "styled-components";
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
export default function JobApplications() {
  const { getJobApplications, isLoading: getJobApplicationsApiLoading } =
    useGetJobApplicationsApiHandler();
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    getJobApplications(
      {},
      { onSuccess: (data) => setApplications(data.applications) }
    );
  }, []);
  return (
    <JobPostingsContainer>
      <h2>Job Postings</h2>
      {getJobApplicationsApiLoading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        applications?.map((job) => (
          <JobPostingCard key={job.job_id}>
            <JobTitle>{job.title}</JobTitle>
            <JobDescription>Requriment : {job.description}</JobDescription>
            <CompanyName>Company: {job.company}</CompanyName>
            <Location>Location: {job.currlocation}</Location>
            <Salary>Salary: {parseInt(job.salary) || "Not Disclosed"}</Salary>
            <button onClick={() => "applyJob(job.job_id)"}>Apply</button>
          </JobPostingCard>
        ))
      )}
    </JobPostingsContainer>
  );
}
