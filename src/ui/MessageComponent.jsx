import styled from "styled-components";
import Spinner from "./Spinner";

const MessageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  background-color: rgba(219, 214, 217, 0.2);
  backdrop-filter: blur(5px);
`;

const MessageContainer = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Message = styled.h3`
  font-size: large;
  padding: 1rem;
`;

export default function MessageComponent({ message }) {
  return (
    <MessageBackground>
      <MessageContainer>
        <Message>{message}</Message>
      </MessageContainer>
    </MessageBackground>
  );
}
