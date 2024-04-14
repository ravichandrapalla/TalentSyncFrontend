/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";

import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import UserContext from "../features/authentication/UserContext";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  margin: 4rem 4.8rem 6.4rem;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background-color: red;
`;

function AppLayout({ userData }) {
  const activetab = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(store.getState());
  }, []);

  useEffect(() => console.log("applayout", userData, activetab), []);
  return (
    <StyledAppLayout>
      <UserContext.Provider value={userData}>
        <Header />
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </UserContext.Provider>
    </StyledAppLayout>
  );
}

export default AppLayout;
