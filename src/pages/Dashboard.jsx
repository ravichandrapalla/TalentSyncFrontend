/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { getAllUsers, getCurrentUser } from "../services/apiAuth";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import store, { setTab } from "../redux/store";
import { useDashBoard } from "../features/authentication/useDashBoard";
import SpinnerComponent from "../ui/SpinnerComponent";
import UserContext from "../features/authentication/UserContext";

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
  height: 100%;
  width: 90%;
  overflow: hidden;
  display: flex;
  gap: 2.5rem;

  border-radius: 1rem;
`;
const Card = styled.div`
  background-color: #fff;
  border-radius: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 20px;
  border: 2px solid yellow;
  width: 25%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
`;
const Parameter = styled.span`
  font-size: 3.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
`;
const Score = styled.span`
  font-size: 6rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
`;

export default function Dashboard() {
  const [data, setData] = useState({});
  const { dashboard, isLoading } = useDashBoard();
  const userData = useContext(UserContext);
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const { registration_number } = userData;
    dashboard(
      {
        registration_number,
      },
      {
        onSuccess: ({ message, records }) => {
          setData(records?.[0]);
          toast.success(message);
        },
        onError: (err) => {
          toast.error(err);
        },
      }
    );

    dispatch(setTab("Dashboard"));
    console.log(store.getState());
  }, []);
  const StatisticsComponent = ({ currData }) => {
    const {
      total_recruiters,
      total_clients,
      total_unverified,
      total_waitinglist,
    } = currData;
    return (
      <>
        <Card>
          <Parameter>Recruiters</Parameter>
          <Score>{total_recruiters}</Score>
        </Card>
        <Card>
          <Parameter>Clients</Parameter>
          <Score>{total_clients}</Score>
        </Card>
        <Card>
          <Parameter>Unclassified</Parameter>
          <Score>{total_waitinglist}</Score>
        </Card>
        <Card>
          <Parameter>Mail Not Verified</Parameter>
          <Score>{total_unverified}</Score>
        </Card>
      </>
    );
  };
  return isLoading ? (
    <SpinnerComponent />
  ) : (
    <StyledSection>
      <StatisticsComponent currData={data} />
    </StyledSection>
  );
}
