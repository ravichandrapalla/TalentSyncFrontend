/* eslint-disable react/prop-types */
import styled from "styled-components";

const ModalDescription = styled.p`
  font-size: 3rem;
`;
const ButtionsSection = styled.button`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
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

export default function EditModal({ isOpen, onClose, user }) {
  console.log("user data is ", user);

  return (
    isOpen && (
      <ModalBackground>
        <ModalContainer>
          <ModalDescription>{`Edit user ${user.username}`}</ModalDescription>
        </ModalContainer>
      </ModalBackground>
    )
  );
}
