/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
function TagInput({ tags, onChange, addTag }) {
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
      type="text"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Type and press enter to add tag"
    />
  );
}

export default TagInput;
