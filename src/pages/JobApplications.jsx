import { useEffect, useState } from "react";
import { useGetJobApplicationsApiHandler } from "../features/authentication/useGetJobApplicationsApiHandler";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useUpdateStatus } from "../features/authentication/useApplicationStatusApiHandler";
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
  const {
    jobApplications,
    isLoading: getJobApplicationsApiLoading,
    error: jobApplicationsError,
  } = useGetJobApplicationsApiHandler();
  const { updateStatus, isLoading: updateApiLoading } = useUpdateStatus();
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    if (jobApplications) {
      setApplications(jobApplications.applicationRecords);
    } else if (jobApplicationsError) {
      toast.error(jobApplicationsError.message);
    }
  }, [jobApplications]);
  const handleStatusUpdate = (e, applicationId) => {
    e.stopPropagation();
    const value = e.target.value;
    updateStatus(
      { value, applicationId },
      {
        onSuccess: (data) => toast.success(data?.message),
        onError: (err) => toast.error(err.message),
      }
    );
  };
  return (
    <JobPostingsContainer>
      <h2>Job Applications</h2>
      {getJobApplicationsApiLoading || updateApiLoading ? (
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
                onChange={(e) => handleStatusUpdate(e, job.application_id)}
              >
                <StyledOption value="Pending">Pending</StyledOption>
                <StyledOption value="Reviewed">Reviewed</StyledOption>
                <StyledOption value="Rejected">Rejected</StyledOption>
                <StyledOption value="Shortlisted">Shortlisted</StyledOption>
              </StyledSelect>
            </Info>
          </JobPostingCard>
        ))
      )}
    </JobPostingsContainer>
  );
}
