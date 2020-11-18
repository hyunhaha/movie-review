import React from "react";
import ReactStarsRating from "react-awesome-stars-rating";
const StarRating = ({ value }) => {
  const onChange = value => {
    console.log(`rate is ${value}`);
  };
  return (
    <ReactStarsRating
      onChange={onChange}
      value={value}
      secondaryColor={"lightgrey"}
    />
  );
};

export default StarRating;
