/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format } from "date-fns";

// const ModalContainer = styled.div`
//   position: relative;
//   width: 100vw;
//   height: 100vh;
//   background-color: red;
// `;
// const ActualModal = styled.section`
//   position: absolute;
//   padding: 1rem;
//   margin: 1rem;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   background-color: green;
// `;
const ModalDescription = styled.p`
  font-size: 3rem;
`;
const ButtionsSection = styled.button`
  display: flex;
  gap: 1rem;
  justify-content: Center;
  background: transparent;
  border: none;
  outline: none;
`;
const StyledButton = styled.button`
  background-color: ${(props) =>
    props.type === "close" ? "#76abae" : "#76abae"};
  padding: 1rem;
  font-size: larger;
  border-radius: 1rem;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  background-color: rgba(219, 214, 217, 0.2);
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #feca1f;
  width: 45%;
  height: 45%;
  border-radius: 1.5rem;
  padding: 1rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  justify-content: space-around;
  text-align: center;
  overflow: hidden;
`;
const UserDetailsContainer = styled.section`
  display: flex;
  gap: 0.5rem;
  margin: auto;
  flex-direction: column;
  text-align: left;
`;
const Detail = styled.p`
  font-size: large;
`;

export default function MyModal({ isOpen, onClose, user }) {
  console.log("user data is ", user);
  const getFormattedTime = (timeStmp) => {
    const date = new Date(timeStmp);
    const formattedDate = format(date, "dd/MM/yyyy HH:mm");
    return formattedDate;
  };
  return (
    isOpen && (
      <ModalBackground>
        <ModalContainer>
          <ModalDescription>More User Details</ModalDescription>
          <UserDetailsContainer>
            <Detail>Db Id : {user.id}</Detail>
            <Detail>Mobile Number : {user.mobile_number}</Detail>
            <Detail>
              User Created At : {getFormattedTime(user.created_at)}
            </Detail>
            <Detail>
              User Updated At : {getFormattedTime(user.updated_at)}
            </Detail>
          </UserDetailsContainer>
          <ButtionsSection>
            <StyledButton type="cancel" onClick={onClose}>
              Close
            </StyledButton>
            {/* <StyledButton type="ok">Proceed</StyledButton> */}
          </ButtionsSection>
        </ModalContainer>
      </ModalBackground>
    )
  );
}
