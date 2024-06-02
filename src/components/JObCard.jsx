/* eslint-disable react/prop-types */

import styled from "styled-components";
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router";
const JobCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;

const JobCardLeft = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  object-fit: cover;
`;

const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobPosition = styled.h4`
  font-size: 1.1rem;
  margin: 0;
`;

const CompanyName = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const JobCardRight = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
`;

const JobCard = ({ position, company, applications, jobId }) => {
  const navigate = useNavigate();
  return (
    <JobCardContainer
      onClick={() => {
        navigate(`/job-applications/${jobId}`);
      }}
    >
      <JobCardLeft>
        <CompanyLogo
          src={`https://logo.clearbit.com/${company}.com`}
          alt={`${company} logo`}
        />
        <JobDetails>
          <JobPosition>{position}</JobPosition>
          <CompanyName>{company}</CompanyName>
        </JobDetails>
      </JobCardLeft>
      <JobCardRight>
        <p>{applications} applied</p>
        <IoIosArrowDropright size={20} color="#7BC9FF" />
      </JobCardRight>
    </JobCardContainer>
  );
};

export default JobCard;
