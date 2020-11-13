import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const MovieDetail = props => {
  console.log(props.match.params.id);
  const [detail, setDetail] = useState({
    title: "title",
    image: null,
  });
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.id}?language=ko-KR&api_key=70cdbfae5467ca38809a62f0d5f139ff`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => setDetail({ ...detail, title: result.title }))
      .catch(error => console.log("error", error));
  }, []);

  return <h1>{detail.title}</h1>;
};

export default MovieDetail;
