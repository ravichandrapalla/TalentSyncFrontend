import React from "react";
import styled from "styled-components";
import { Logout } from "../features/authentication/Logout";

const StyledModal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 60px;
  right: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  z-index: 1000;
`;
const StyledEmail = styled.p`
  margin-bottom: 10px;
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
