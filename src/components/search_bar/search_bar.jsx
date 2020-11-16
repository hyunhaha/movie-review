import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef();
  const history = useHistory();
  const onKeyPress = event => {
    const value = inputRef.current.value;
    if (event.key === "Enter") {
      console.log(value);
      onSearch(value);
      history.push("/search-result");
      inputRef.current.value = "";
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
