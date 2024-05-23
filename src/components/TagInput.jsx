/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
function TagInput({ tags, onChange, addTag, register, id }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };
  useEffect(() => {
    setInputValue("");
  }, [tags]);

  return (
    <input
      id={id}
      type="text"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={inputValue}
      placeholder="Type and press enter to add tag"
    />
  );
}

export default TagInput;
