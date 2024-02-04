import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "login" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      width: 50rem;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
  ${(props) =>
    props.type === "signup" &&
    css`
      width: 48rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;
Form.defaultProps = {
  type: "login",
};

export default Form;
