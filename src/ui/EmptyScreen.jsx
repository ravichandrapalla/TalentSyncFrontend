import { TbMoodEmpty } from "react-icons/tb";
import styled from "styled-components";

const NoDataMessageModel = styled.article`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function EmptyScreen() {
  return (
    <NoDataMessageModel>
      <TbMoodEmpty size={100} color="tomato" />
      <p>Oops!.. No data Found</p>
    </NoDataMessageModel>
  );
}
