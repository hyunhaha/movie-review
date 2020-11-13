import React from "react";
import { useRef } from "react";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef();
  const onKeyPress = event => {
    const value = inputRef.current.value;
    if (event.key === "Enter") {
      console.log(value);
      onSearch(value);
    }
  };
  return (
    <label>
      <input
        ref={inputRef}
        type="text"
        placeholder="search..."
        onKeyPress={onKeyPress}
      />
    </label>
  );
};

export default SearchBar;
