import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";

import { SignUp } from "./pages/SignUp";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
// import { useEffect } from "react";
import AllUsers from "./pages/AllUsers";
import Recruiter from "./pages/Recruiter";
// Supports weights 100-900
import "@fontsource-variable/outfit";
import Client from "./pages/Client";
import Unclassified from "./pages/Unclassified";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProfileView from "./pages/Profile";
import FindClients from "./pages/FindClients";
import JobPostings from "./pages/JobPostings";
import JobApplications from "./pages/JobApplications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  // useEffect(
  //   () => console.log(sessionStorage.getItem("userData").token, "session"),
  //   []
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Provider store={store}>
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              </Provider>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="unclassified" element={<Unclassified />} />
            <Route path="recruiter" element={<Recruiter />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="clients" element={<Client />} />
            <Route path="findclient" element={<FindClients />} />
            <Route path="job-postings" element={<JobPostings />} />
            <Route path="job-applications" element={<JobApplications />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "10px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500PX",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
