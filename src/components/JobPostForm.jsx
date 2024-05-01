import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const JobFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 4rem;
  align-items: center;
`;
const FormElement = styled.div`
  display: flex;
  column-gap: 3rem;
  width: 100%;
`;
const LocalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 1rem;
`;
const ButtonsContainer = styled.div`
  margin: 5rem 0rem;
  display: flex;
  justify-content: space-between;
`;
export default function JobPostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <JobFormContainer>
      <h2>Job Posting Form</h2>
      <LocalForm onSubmit={handleSubmit(onSubmit)}>
        <FormElement>
          <label htmlFor="title" style={{ minWidth: "200px" }}>
            Job Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            style={{ minWidth: "200px" }}
          />
          {errors.title && <span>This field is Required</span>}
        </FormElement>
        <FormElement>
          <label htmlFor="description" style={{ minWidth: "200px" }}>
            Job Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            style={{ minWidth: "200px" }}
          />
          {errors.description && (
            <span className="error">This field is required</span>
          )}
        </FormElement>
        <FormElement>
          <label htmlFor="company" style={{ minWidth: "200px" }}>
            Company Name
          </label>
          <input
            type="text"
            id="company"
            {...register("company", { required: true })}
            style={{ minWidth: "200px" }}
          />
          {errors.company && (
            <span className="error">This field is required</span>
          )}
        </FormElement>
        <FormElement>
          <label htmlFor="location" style={{ minWidth: "200px" }}>
            Location
          </label>
          <input
            type="text"
            id="location"
            {...register("location", { required: true })}
            style={{ minWidth: "200px" }}
          />
          {errors.location && (
            <span className="error">This field is required</span>
          )}
        </FormElement>
        <FormElement>
          <label htmlFor="salary" style={{ minWidth: "200px" }}>
            Salary
          </label>
          <input
            type="number"
            id="salary"
            {...register("salary")}
            style={{ minWidth: "200px" }}
          />
        </FormElement>
        <ButtonsContainer>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </ButtonsContainer>
      </LocalForm>
    </JobFormContainer>
  );
}
