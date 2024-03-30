import { useState, useEffect } from "react";
import { getAllUsers, getCurrentUser } from "../services/apiAuth";
import toast from "react-hot-toast";
import styled from "styled-components";

const StyledArticle = styled.article`
  width: 200px;
  height: 150px;
  background-color: burlywood;
  color: white;
`;
const StyledUserName = styled.p`
  font-weight: 400;
  color: white;
`;
const StyledEmail = styled.p`
  font-weight: 300;
  color: tomato;
`;
const StyledRole = styled.p`
  font-weight: 300;
  color: green;
`;
const StyledRegNo = styled.p`
  font-weight: 300;
  color: grey;
`;
const StyledSection = styled.section`
  min-height: 100%;
  min-width: 100%;
  background-color: grey;
`;

export default function Dashboard() {
  return <div>....</div>;
}
