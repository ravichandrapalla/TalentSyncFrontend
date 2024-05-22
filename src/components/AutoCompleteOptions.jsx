/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid black;
  max-height: 200px;
  overflow-y: scroll;
  position: fixed;
  margin-top: 50px;
  background: white;
  width: 500px;
`;

export const Option = styled.div`
  padding: 2px 8px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;

  :hover {
    background: #eee;
  }
`;

const AutoCompleteOptions = ({ options, addTag }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(options);
  }, [options]);

  if (options.length === 0) {
    return <></>;
  }
  const handleAddTag = (name) => {
    addTag(name.toLowerCase());
  };

  return (
    <RootContainer>
      {data.map((o) => (
        <Option
          key={Math.random()}
          onClick={() => handleAddTag(o.name.toLowerCase())}
        >
          {o.name}
        </Option>
      ))}
    </RootContainer>
  );
};

export default AutoCompleteOptions;
