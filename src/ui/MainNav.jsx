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

import { useContext } from "react";
import UserContext from "../features/authentication/UserContext";

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

function MainNav() {
  const userData = useContext(UserContext);
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
        <li>
          <StyledNavLink to="/recruiter">
            {/* <HiOutlineHomeModern /> */}
            <MdOutlinePeopleAlt />
            <span>{`Recruiters    ${
              userData?.role === "Recruiter" ? "(You)" : ""
            }`}</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/clients">
            {/* <HiOutlineUsers /> */}
            <BiFileFind />
            <span>{`Clients ${
              userData?.role_id === "Client" ? "(You)" : ""
            } `}</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/unclassified">
            <IoColorFilterOutline />
            <span>{`Unclassified`}</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
