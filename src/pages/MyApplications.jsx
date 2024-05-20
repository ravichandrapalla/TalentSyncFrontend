import { useEffect, useState } from "react";
import { useGetJobApplicationsApiHandler } from "../features/authentication/useGetJobApplicationsApiHandler";
import styled from "styled-components";
import { useGetClientJobApplicationsApiHandler } from "../features/authentication/useGetClientJobApplicationsApiHandler";
import toast from "react-hot-toast";
import { differenceInMilliseconds, formatDistance } from "date-fns";
import MessageComponent from "../ui/MessageComponent";
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

export default function MyApplications() {
  const [message, setMessage] = useState("");
  const {
    getClientJobApplications,
    isLoading: getClientJobApplicationApiLoading,
  } = useGetClientJobApplicationsApiHandler();
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    getClientJobApplications(
      {},
      {
        onSuccess: (data) => {
          setApplications(data.applicationRecords);
          if (!data.isUserAllowed) {
            setMessage("You access is Revoked by Admin please Contact Admin");
          }
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }, []);
  const formatTime = (timestamp) => {
    const currentTime = new Date();

    const difference = differenceInMilliseconds(
      currentTime,
      new Date(timestamp)
    );
    const formattedDifference = formatDistance(0, difference, {
      includeSeconds: true,
    });

    return `${formattedDifference} ago`;
  };
  return (
    <JobPostingsContainer>
      {message && <MessageComponent message={message} />}
      <h2>Job Applications</h2>
      {getClientJobApplicationApiLoading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications?.map((job) => (
          <JobPostingCard key={job.applied_at}>
            <JobTitle>{job.title}</JobTitle>
            <Info>Company: {job.company}</Info>
            <Info>Location : {job.currlocation}</Info>
            <Info>Salary: {job.salary}</Info>
            <Info>Resume Used : {job.resume_url}</Info>
            <Info>Status: {job.status}</Info>
            <Info>Applied : {formatTime(job.applied_at)}</Info>
          </JobPostingCard>
        ))
      )}
    </JobPostingsContainer>
  );
}
