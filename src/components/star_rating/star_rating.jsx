import React from "react";
import { useState } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import { useHistory } from "react-router-dom";
const StarRating = ({ value, userId, setRate }) => {
  const history = useHistory();
  // const [login, setLogin] = useState(false);
  const [star, setStar] = useState(true);
  const onChange = value => {
    console.log(`rate is ${value}`);
    if (!userId) {
      history.push("/login");
    } else {
      setRate(value);
      setStar(false);
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
      isEdit={star}
    />
  );
};

export default StarRating;
