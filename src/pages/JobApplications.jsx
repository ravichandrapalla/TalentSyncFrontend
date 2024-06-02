import { useEffect, useState } from "react";
import { useGetJobApplicationsApiHandler } from "../features/authentication/useGetJobApplicationsApiHandler";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useUpdateStatus } from "../features/authentication/useApplicationStatusApiHandler";
import MessageComponent from "../ui/MessageComponent";
import { useParams } from "react-router";
const JobPostingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  height: 100vh;
  width: 100vw;
`;

const JobPostingCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  /* &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  } */
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const StyledSelect = styled.select`
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
`;

const StyledOption = styled.option`
  background-color: #fff;
  color: #333;
  padding: 10px;
`;

export default function JobApplications() {
  const { jobId } = useParams();
  const [message, setMessage] = useState("");
  const {
    jobApplications,
    isLoading: getJobApplicationsApiLoading,
    error: jobApplicationsError,
  } = useGetJobApplicationsApiHandler(jobId);
  const { updateStatus, isLoading: updateApiLoading } = useUpdateStatus();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    console.log("status ---> ", jobApplications);
    if (Array.isArray(jobApplications) && !jobApplications.isUserAllowed) {
      setMessage("You access is Revoked by Admin please Contact Admin");
    }
    if (jobApplications) {
      setApplications(jobApplications.applicationRecords);
    } else if (jobApplicationsError) {
      toast.error(jobApplicationsError.message);
    }
  }, [jobApplications, jobApplicationsError]);
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
      {message && <MessageComponent message={message} />}
      <h2>Job Applications</h2>
      {getJobApplicationsApiLoading || updateApiLoading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        applications?.map((job) => (
          <JobPostingCard key={job.job_id}>
            <JobTitle>{job.title}</JobTitle>
            <Info>
              <strong>Job Role:</strong> {job.title}
            </Info>
            <Info>
              <strong>User Name:</strong> {job.username}
            </Info>
            <Info>
              <strong>Email:</strong> {job.email}
            </Info>
            <Info>
              <strong>Organization:</strong> {job.organization ?? "N/A"}
            </Info>
            <Info>
              <strong>Phone:</strong> {job.mobile_number}
            </Info>
            <Info>
              <strong>Experience:</strong> {job.experience ?? 0} years
            </Info>
            <Info>
              <strong>Status:</strong>{" "}
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
