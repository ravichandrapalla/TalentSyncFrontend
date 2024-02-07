/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { cloneElement, useEffect } from "react";
import toast from "react-hot-toast";

const FullPage = styled.div`
  height: 100vh;
  background-color: var() (--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1 . Load auth user
  const { reason, isAuthenticated, userData } = useUser();

  //2 . While loading show spinner

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    reason && toast.error(reason);
  }, [isAuthenticated]);

  // if (isLoading)
  //   return (
  //     <FullPage>
  //       <Spinner />
  //     </FullPage>
  //   );

  //3 . If there is No auth user, redirect to /login

  //4 . if there is a user, render the app

  if (isAuthenticated) return cloneElement(children, { userData });
}
