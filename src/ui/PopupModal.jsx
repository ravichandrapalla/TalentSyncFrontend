import React from "react";
import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";

const StyledModal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;
  top: 65px;
  right: 50px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 15px;
  /* width: 200px; */
  z-index: 1000;
  &:after {
    content: ""; /* Required to display content */
    position: absolute; /* Sets the position absolute to the top div */
    top: 5px;
    right: 23.4%; /* position the little arrow */
    margin-left: -15px;
    margin-top: -15px; /* Set margin equal to border px */
    width: 0;
    z-index: 100000;

    height: 0;
    border-bottom: solid 10px grey; /* Creates the arrow pointing up, to change to a notch instead user border-top */
    border-left: solid 10px transparent; /* Creates triangle effect */
    border-right: solid 10px transparent; /* Creates triangle effect */
  }
`;
const StyledEmail = styled.p`
  /* margin-bottom: 10px; */
  font-size: 14px;
  color: #333;
`;

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function PopupModal({ isModalOpen, email }) {
  return (
    isModalOpen && (
      <StyledModal>
        <StyledEmail>{email}</StyledEmail>
        <Logout />
      </StyledModal>
    )
  );
}
