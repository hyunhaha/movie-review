import React from "react";
import { useState } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import { useHistory } from "react-router-dom";
const StarRating = ({ value, userId, setRate }) => {
  const history = useHistory();

  const [star, setStar] = useState(value);
  const onChange = value => {
    console.log(`rate is ${value}`);
    if (!userId) {
      history.push("/login");
    } else {
      setRate(value); //데이터베이스 전달
      setStar(value); //별 표시
    }
  };

  return (
    <ReactStarsRating
      onChange={onChange}
      value={star ? star : value}
      secondaryColor={"lightgray"}
    />
  );
};

export default StarRating;
