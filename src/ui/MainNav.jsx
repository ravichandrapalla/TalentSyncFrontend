import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BiFileFind } from "react-icons/bi";
import { IoColorFilterOutline } from "react-icons/io5";

import { useContext, useEffect, useState } from "react";
import UserContext from "../features/authentication/UserContext";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import useJobApplications from "../features/authentication/useJobApplications";
import JobCard from "../components/JObCard";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
const StyledSubMenuContainer = styled.div`
  position: absolute;
  background-color: red;
  left: 25rem;
  top: 0;
  padding: 1rem;
`;
const StyledSubMenuItem = styled.div`
  display: flex;
  background-color: green;
  width: 300px;
  height: 200px;
`;
const JobContainer = styled.div`
  position: absolute;
  left: 25rem;
  top: -1rem;
  width: 35rem;
  z-index: 1000;
`;

function MainNav() {
  const userData = useContext(UserContext);
  const storeData = useSelector((state) => state);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { jobApplicationsData, isLoading, error } = useJobApplications();
  useEffect(() => {
    console.log("current page is -------->", storeData.tabSlice.tab);
  }, [storeData.tabSlice]);
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            {/* <HiOutlineHome /> */}
            <LuLayoutDashboard />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        {userData.role === "Recruiter" && (
          <li>
            <StyledNavLink to="/findclient">
              {userData.role === "Admin" ? (
                <MdOutlinePeopleAlt />
              ) : (
                <CgProfile />
              )}

              <span>Find Client</span>
            </StyledNavLink>
          </li>
        )}
        {userData.role === "Admin" && (
          <li>
            <StyledNavLink to="/recruiter">
              {userData.role === "Admin" ? (
                <MdOutlinePeopleAlt />
              ) : (
                <CgProfile />
              )}

              <span>
                {userData.role === "Admin" ? "Recruiter" : "My Profile"}
              </span>
            </StyledNavLink>
          </li>
        )}
        {
          <li>
            <StyledNavLink to="/job-postings">
              <BiFileFind />
              <span>
                {userData.role === "Admin"
                  ? "Job Postings"
                  : userData.role === "Recruiter"
                  ? "My Job Posting"
                  : "New Job Openings"}
              </span>
            </StyledNavLink>
          </li>
        }
        {
          <li>
            <StyledNavLink
              to={`${userData.role === "Admin" ? "/clients" : "/profile"}`}
            >
              {userData.role === "Admin" ? <BiFileFind /> : <CgProfile />}

              <span>{userData.role === "Admin" ? "Client" : "My Profile"}</span>
            </StyledNavLink>
          </li>
        }
        {userData.role === "Admin" && (
          <li>
            <StyledNavLink to="/unclassified">
              <IoColorFilterOutline />
              <span>{`Unclassified`}</span>
            </StyledNavLink>
          </li>
        )}
        {userData.role === "Admin" && (
          <li>
            <StyledNavLink to="/settings">
              <HiOutlineCog6Tooth />
              <span>Settings</span>
            </StyledNavLink>
          </li>
        )}
        {userData.role === "Recruiter" && (
          <li
            style={{ position: "relative" }}
            onBlur={() => {
              setTimeout(() => {
                setSubmenuOpen((prev) => !prev);
              }, 300);
            }}
          >
            <StyledNavLink
              // to="/job-applications"
              onClick={() => setSubmenuOpen((prev) => !prev)}
            >
              <HiOutlineCog6Tooth />
              <span>Job Applications</span>
            </StyledNavLink>
            {submenuOpen &&
              !isLoading &&
              jobApplicationsData.applicationRecords.length > 0 && (
                <JobContainer>
                  {jobApplicationsData.applicationRecords.map((application) => {
                    return (
                      <JobCard
                        key={application.job_id}
                        jobId={application.job_id}
                        position={application.title}
                        company={application.company}
                        applications={application.application_count}
                      />
                    );
                  })}
                </JobContainer>
              )}
          </li>
        )}
        {userData.role === "Client" && (
          <li>
            <StyledNavLink to="/My-applications">
              <HiOutlineCog6Tooth />
              <span>My Applications</span>
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;

/*
 */
