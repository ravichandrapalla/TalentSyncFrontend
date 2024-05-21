import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../features/authentication/UserContext";
import { useGetJobPostingsApiHandler } from "../features/authentication/useGetJobPostingsApiHandler";
import toast from "react-hot-toast";
import { useApplyJobPostingApiHandler } from "../features/authentication/useApplyJobPostingApiHandler";
import SpinnerComponent from "../ui/SpinnerComponent";
import MessageComponent from "../ui/MessageComponent";
import { CiBookmark } from "react-icons/ci";
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const HeaderStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;
const JobCount = styled.span`
  font-size: 15px;
  padding: 5px;
  border: 1px solid #fed8b1;
  border-radius: 50px;
  color: #888;
`;
const HeaderSortSection = styled.div`
  display: flex;
  align-items: center;
`;
const JobPostingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const JobPostingCard = styled.div`
  background-color: #fff;
  padding: 4px;
  border: 1.5px solid #eadbc8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;
const JobCardPalate = styled.div`
  background-color: #ffe1cc;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  gap: 1rem;
`;
const CardSectionOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const JobDate = styled.div`
  display: inline;
  border-radius: 1rem;
  background-color: #fff;
  padding: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: black;
`;
const BookMarkContainer = styled.div`
  background-color: #fff;
  width: 22px;
  height: 22px;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardSectionTwo = styled.div`
  /* width: 70%; */
`;
const JobTitleText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;
const CompanyIcon = styled.div``;

const JobTags = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const JObCardFooter = styled.div`
  padding: 0.7rem;
  display: flex;
  justify-content: space-between;
`;
const JobSalary = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const JobLocation = styled.div`
  font-size: 14px;
  color: #888;
`;
const DeatilsButton = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
const SortByLabel = styled.label`
  font-family: "orkneyregular", "Outfit Variable", sans-serif;
  font-size: 1.5rem;
  color: #a9a9a9;
`;
const FontLabelHeading = styled.h1`
  font-family: "orkneybold", "Outfit Variable", sans-serif;
  font-size: 3rem;
  color: black;
`;
const FontTypeSV1 = styled.span`
  font-family: "orkneyregular", "Outfit Variable", sans-serif;
  font-size: 0.8rem;
  color: black;
`;
const FontTypeSV2 = styled.span`
  font-family: "orkneymedium", "Outfit Variable", sans-serif;
  font-size: 1.2rem;
  color: black;
`;
const FontTypeSV3 = styled.p`
  font-family: "orkneymedium", "Outfit Variable", sans-serif;
  font-size: 1.8rem;
  color: black;
`;
const FontTypeSV4 = styled.span`
  font-family: "orkneymedium", "Outfit Variable", sans-serif;
  font-size: 1.2rem;
  color: #551692;
`;
const JobKeyWords = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #551692;
  border-radius: 0.7rem;
  background-color: #f1e3ff;
  padding: 0.4rem;
`;

const JobPostings = () => {
  const [message, setMessage] = useState("");
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
        onSuccess: ({ message, jobPosts, isUserAllowed }) => {
          toast.success(message);
          setJobPostings(jobPosts);
          if (!isUserAllowed) {
            setMessage("You access is Revoked by Admin please Contact Admin");
          }
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
    <MainContent>
      <HeaderSection>
        <HeaderStart>
          <FontLabelHeading>Recommended jobs</FontLabelHeading>
          <JobCount>386</JobCount>
        </HeaderStart>
        <HeaderSortSection>
          <SortByLabel htmlFor="sort-option">Sort by:</SortByLabel>
          <select id="sort-option">
            <option value="last-updated">Last updated</option>
          </select>
        </HeaderSortSection>
      </HeaderSection>
      <JobPostingsContainer>
        {message && <MessageComponent message={message} />}

        {getJobPostsApiLoading || applyJobPostsApiLoading ? (
          <SpinnerComponent />
        ) : jobPostings.length === 0 ? (
          <p>No job postings found.</p>
        ) : (
          jobPostings?.map((job) => (
            <JobPostingCard key={job.job_id}>
              <JobCardPalate>
                <CardSectionOne>
                  <JobDate>
                    <FontTypeSV1>20 May, 2023</FontTypeSV1>
                  </JobDate>
                  <BookMarkContainer>
                    <CiBookmark />
                  </BookMarkContainer>
                </CardSectionOne>
                <CardSectionOne>
                  <CardSectionTwo>
                    <FontTypeSV2>{job.company}</FontTypeSV2>
                    <FontTypeSV3>{job.title}</FontTypeSV3>
                  </CardSectionTwo>
                  <CompanyIcon>&copy;</CompanyIcon>
                </CardSectionOne>
                <JobTags>
                  <JobKeyWords>
                    <FontTypeSV4>Part time</FontTypeSV4>
                  </JobKeyWords>

                  <span>Senior level</span>
                  <span>Distant</span>
                  <span>Project work</span>
                </JobTags>
              </JobCardPalate>
              <JObCardFooter>
                <CardSectionTwo>
                  <JobSalary>
                    {parseInt(job.salary) || "Not Disclosed"}
                  </JobSalary>
                  <JobLocation>{job.currlocation}</JobLocation>
                </CardSectionTwo>
                {userData.role === "Client" && (
                  <DeatilsButton onClick={() => applyJobHandler(job.job_id)}>
                    Apply
                  </DeatilsButton>
                )}
                <DeatilsButton>Details</DeatilsButton>
              </JObCardFooter>

              {/* <JobTitle>{job.title}</JobTitle>
              <JobDescription>{job.description}</JobDescription>
              <CompanyName>Company: {job.company}</CompanyName>
              <Location>Location: {job.currlocation}</Location>
              <Salary>Salary: {parseInt(job.salary) || "Not Disclosed"}</Salary>
              {userData.role === "Client" && (
                <button onClick={() => applyJobHandler(job.job_id)}>
                  Apply
                </button>
              )} */}
            </JobPostingCard>
          ))
        )}
      </JobPostingsContainer>
    </MainContent>
  );
};

export default JobPostings;
