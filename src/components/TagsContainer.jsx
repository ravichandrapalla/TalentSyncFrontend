/* eslint-disable react/prop-types */
import { memo } from "react";
import Tag from "./Tag";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const TagsContainer = ({ tags, removeTag }) => {
  return (
    <Container>
      {tags.map((tag, i) => (
        <Tag removeTag={removeTag} key={`tag-${i}`} tag={tag} />
      ))}
    </Container>
  );
};

export default TagsContainer;
