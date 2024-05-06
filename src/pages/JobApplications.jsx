import { useEffect, useState } from "react";
import { useGetJobApplicationsApiHandler } from "../features/authentication/useGetJobApplicationsApiHandler";
import styled from "styled-components";
import { toast } from "react-hot-toast";
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
  cursor: pointer;
`;

const JobTitle = styled.h3`
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin-bottom: 10px;
`;
const StyledSelect = styled.select`
  background-color: grey;
  border-radius: 1rem;
  padding: 0.8rem;
`;
const StyledOption = styled.option`
  background-color: yellow;
  color: black;
  padding: 0.5rem;
`;

export default function JobApplications() {
  const { getJobApplications, isLoading: getJobApplicationsApiLoading } =
    useGetJobApplicationsApiHandler();
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    getJobApplications(
      {},
      {
        onSuccess: (data) => setApplications(data.applicationRecords),
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }, []);
  const handleStatusUpdate = (e) => {
    e.stopPropagation();
  };
  return (
    <JobPostingsContainer>
      <h2>Job Applications</h2>
      {getJobApplicationsApiLoading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        applications?.map((job) => (
          <JobPostingCard key={job.job_id}>
            <JobTitle>{job.title}</JobTitle>
            <Info>JobRole: {job.title}</Info>
            <Info>UserName : {job.username}</Info>
            <Info>Email: {job.email}</Info>
            <Info>Organization : {job.organization ?? "N/A"}</Info>
            <Info>Phone: {job.mobile_number}</Info>
            <Info>Experience : {job.experience ?? 0}</Info>

            <Info>
              Status:{" "}
              <StyledSelect
                defaultValue={job.status}
                onBlur={(e) => handleStatusUpdate(e)}
              >
                <StyledOption value="Pending">Pending</StyledOption>
                <StyledOption value="Reviewed">reviewed</StyledOption>
                <StyledOption value="Rejected">rejected</StyledOption>
                <StyledOption value="Shortlisted">shortlisted</StyledOption>
              </StyledSelect>
            </Info>
          </JobPostingCard>
        ))
      )}
    </JobPostingsContainer>
  );
}
