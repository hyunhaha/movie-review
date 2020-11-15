import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const MovieDetail = ({ movieDB }) => {
  const params = useParams();
  const [detail, setDetail] = useState({
    title: "title",
    image: null,
  });
  useEffect(() => {
    movieDB
      .movieDetail(params.id)
      .then(result => setDetail({ title: result.title }))
      .catch(error => console.log("error", error));
  }, [params.id, movieDB]);

  return <h1>{detail.title}</h1>;
};

export default MovieDetail;
