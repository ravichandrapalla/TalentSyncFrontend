import { useEffect, useState } from "react";
import styled from "styled-components";

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
  width: 70%;
  height: 70%;
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
export default function LocationPicker() {
  const [cities, setCities] = useState([]);

  useEffect(() => {}, []);

  return (
    <ModalBackground>
      <ModalContainer></ModalContainer>
    </ModalBackground>
  );
}
