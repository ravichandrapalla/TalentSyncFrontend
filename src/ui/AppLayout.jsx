import { Outlet } from "react-router-dom";

import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import UserContext from "../features/authentication/UserContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  overflow: scroll;
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
  useEffect(() => console.log("applayout", userData), []);
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
