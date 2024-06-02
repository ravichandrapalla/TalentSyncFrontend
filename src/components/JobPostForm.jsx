import { useForm } from "react-hook-form";
import styled from "styled-components";

import SpinnerComponent from "../ui/SpinnerComponent";
import { usePostJobApiHandler } from "../features/authentication/usePostJobApiHandler";
import toast from "react-hot-toast";
import TagsContainer from "./TagsContainer";
import { useCallback, useEffect, useState } from "react";
import TagInput from "./TagInput";
import AutoCompleteOptions from "./AutoCompleteOptions";
const skills = [
  { name: "JavaScript" },
  { name: "Python" },
  { name: "Java" },
  { name: "C++" },
  { name: "C#" },
  { name: "Ruby" },
  { name: "PHP" },
  { name: "Swift" },
  { name: "Kotlin" },
  { name: "Go" },
  { name: "SQL" },
  { name: "NoSQL" },
  { name: "HTML" },
  { name: "CSS" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Angular" },
  { name: "Vue.js" },
  { name: "Node.js" },
  { name: "Express.js" },
  { name: "Django" },
  { name: "Flask" },
  { name: "Spring" },
  { name: "Hibernate" },
  { name: "ASP.NET" },
  { name: "Laravel" },
  { name: "Symfony" },
  { name: "Ruby on Rails" },
  { name: "Bootstrap" },
  { name: "SASS" },
  { name: "LESS" },
  { name: "Webpack" },
  { name: "Babel" },
  { name: "Docker" },
  { name: "Kubernetes" },
  { name: "AWS" },
  { name: "Azure" },
  { name: "Google Cloud" },
  { name: "Terraform" },
  { name: "Ansible" },
  { name: "Jenkins" },
  { name: "Git" },
  { name: "CI/CD" },
  { name: "Microservices" },
  { name: "REST APIs" },
  { name: "GraphQL" },
  { name: "Machine Learning" },
  { name: "Data Science" },
  { name: "Artificial Intelligence" },
  { name: "Deep Learning" },
  { name: "NLP" },
  { name: "Computer Vision" },
  { name: "Big Data" },
  { name: "Hadoop" },
  { name: "Spark" },
  { name: "Tableau" },
  { name: "Power BI" },
  { name: "Excel" },
  { name: "Agile" },
  { name: "Scrum" },
  { name: "Kanban" },
  { name: "Project Management" },
  { name: "Business Analysis" },
  { name: "UI/UX Design" },
  { name: "Adobe Photoshop" },
  { name: "Adobe Illustrator" },
  { name: "Figma" },
  { name: "Sketch" },
  { name: "InVision" },
  { name: "SEO" },
  { name: "Content Writing" },
  { name: "Digital Marketing" },
  { name: "Social Media Marketing" },
  { name: "Salesforce" },
  { name: "SAP" },
  { name: "Oracle" },
  { name: "MySQL" },
  { name: "PostgreSQL" },
  { name: "MongoDB" },
  { name: "Redis" },
  { name: "ElasticSearch" },
  { name: "Graph Databases" },
  { name: "Blockchain" },
  { name: "Cryptocurrency" },
  { name: "Cybersecurity" },
  { name: "Penetration Testing" },
  { name: "Network Security" },
  { name: "DevOps" },
  { name: "SRE" },
  { name: "Project Management" },
  { name: "Business Analysis" },
  { name: "Accounting" },
  { name: "Financial Analysis" },
  { name: "Marketing" },
  { name: "Sales" },
  { name: "Customer Service" },
  { name: "Human Resources" },
  { name: "Recruitment" },
  { name: "Operations Management" },
  { name: "Supply Chain Management" },
  { name: "Logistics" },
  { name: "Event Planning" },
  { name: "Public Relations" },
  { name: "Teaching" },
  { name: "Curriculum Development" },
  { name: "Training and Development" },
  { name: "Healthcare Management" },
  { name: "Nursing" },
  { name: "Patient Care" },
  { name: "Pharmacy" },
  { name: "Dentistry" },
  { name: "Physical Therapy" },
  { name: "Radiology" },
  { name: "Medical Coding" },
  { name: "Medical Billing" },
  { name: "Legal Research" },
  { name: "Contract Law" },
  { name: "Corporate Law" },
  { name: "Litigation" },
  { name: "Family Law" },
  { name: "Criminal Law" },
  { name: "Construction Management" },
  { name: "Civil Engineering" },
  { name: "Electrical Engineering" },
  { name: "Mechanical Engineering" },
  { name: "Chemical Engineering" },
  { name: "Architectural Design" },
  { name: "Interior Design" },
  { name: "Graphic Design" },
  { name: "3D Modeling" },
  { name: "Animation" },
  { name: "Video Editing" },
  { name: "Photography" },
  { name: "Music Production" },
  { name: "Sound Engineering" },
  { name: "Culinary Arts" },
  { name: "Baking" },
  { name: "Bartending" },
  { name: "Restaurant Management" },
  { name: "Hotel Management" },
  { name: "Tourism" },
  { name: "Travel Planning" },
  { name: "Aviation" },
  { name: "Piloting" },
  { name: "Cabin Crew" },
  { name: "Automotive Repair" },
  { name: "Electric Vehicle Maintenance" },
  { name: "Welding" },
  { name: "Plumbing" },
  { name: "Carpentry" },
  { name: "Masonry" },
  { name: "Landscaping" },
  { name: "Gardening" },
  { name: "Agriculture" },
  { name: "Animal Husbandry" },
  { name: "Veterinary Medicine" },
  { name: "Zoology" },
  { name: "Botany" },
  { name: "Environmental Science" },
  { name: "Renewable Energy" },
  { name: "Data Analysis" },
  { name: "Machine Learning" },
  { name: "Artificial Intelligence" },
  { name: "Big Data" },
  { name: "Excel" },
  { name: "SAP" },
  { name: "Oracle" },
  { name: "Salesforce" },
  { name: "Digital Marketing" },
  { name: "Content Writing" },
  { name: "SEO" },
  { name: "Social Media Marketing" },
  { name: "Public Speaking" },
  { name: "Negotiation" },
  { name: "Conflict Resolution" },
  { name: "Team Leadership" },
  { name: "Time Management" },
  { name: "Critical Thinking" },
  { name: "Problem Solving" },
  { name: "Creativity" },
  { name: "Adaptability" },
  { name: "Networking" },
  { name: "Collaboration" },
  { name: "Interpersonal Communication" },
  { name: "Emotional Intelligence" },
];

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

export const TagInputContainer = styled.div`
  border: 1px solid black;
  padding: 4px 2px;
  display: flex;
`;
export default function JobPostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      company: "",
      skills: [],
      location: "",
      salary: 0,
    },
  });
  const { jobPost, isLoading } = usePostJobApiHandler();
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValue(
      "skills",
      tags.map((tag) => tag.name)
    );
  }, [tags, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    jobPost(data, {
      onSettled: reset({
        title: "",
        description: "",
        company: "",
        skills: [],
        location: "",
        salary: 0,
      }),
      onSuccess: ({ message }) => {
        toast.success(message);
      },
    });
  };
  const removeTag = useCallback(
    ({ name: removeName }) => {
      const existingTagIdx = tags.findIndex(
        ({ name }) => name.toLowerCase() === removeName.toLowerCase()
      );

      const newTags = [...tags];
      newTags.splice(existingTagIdx, 1);

      setTags(newTags);
    },
    [tags]
  );
  const handleChange = useCallback(
    (value) => {
      if (value === "") {
        setOptions([]);
        return;
      }
      const target = value.toLowerCase();
      console.log("target is ", target);
      const matchedSkills = skills.filter(({ name }) => {
        const isInTags = tags.find((tag) => tag.name === target);
        const hasValue = name.toLowerCase().includes(target);
        return !isInTags && hasValue;
      });
      console.log("matched skills ", matchedSkills);
      setOptions(matchedSkills);
    },
    [tags]
  );
  const addTag = useCallback(
    (value) => {
      const existingTag = tags.find(
        ({ name }) => name.toLowerCase() === value.toLowerCase()
      );

      if (existingTag) {
        setOptions([]);
        return;
      }
      console.log("here i adding", value);
      const newTags = [
        ...tags,
        {
          name: value,
        },
      ];

      setTags(newTags);
      setOptions([]);
      console.log("set done", newTags);
    },
    [tags]
  );
  return isLoading ? (
    <SpinnerComponent />
  ) : (
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
          <label htmlFor="skills" style={{ minWidth: "200px" }}>
            Skills
          </label>
          <TagInputContainer>
            <TagsContainer tags={tags} removeTag={removeTag} />
            <TagInput
              id="skills"
              tags={tags}
              onChange={handleChange}
              addTag={addTag}
              register={register}
              // clearOptions={() => setOptions([])}
            />
          </TagInputContainer>
          {errors.skills && (
            <span className="error">This field is required</span>
          )}
          <AutoCompleteOptions
            addTag={addTag}
            options={options}
            // clearOptions={() => setOptions([])}
          />
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
