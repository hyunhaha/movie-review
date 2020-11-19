import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import { useHistory } from "react-router-dom";
const StarRating = ({ value, login }) => {
  const history = useHistory();
  // const [login, setLogin] = useState(false);

  const onChange = value => {
    console.log(`rate is ${value}`);
    if (login === false) {
      history.push("/login");
    } else {
    }
  };
  // useEffect(() => {
  //   authService.onAuthChange(user => {
  //     if (!user) {
  //       setLogin(false);
  //     } else {
  //       setLogin(true);
  //     }
  //   });
  // }, [authService, login]);
  return (
    <ReactStarsRating
      onChange={onChange}
      value={value}
      secondaryColor={"lightgray"}
    />
  );
};

export default StarRating;
