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
      .then(result =>
        setDetail({
          title: result.title,
          image: "https://image.tmdb.org/t/p/w500" + result.backdrop_path,
        })
      )
      .catch(error => console.log("error", error));
  }, [params.id, movieDB]);

  return (
    <div>
      <h1>{detail.title}</h1>
      <img src={detail.image} alt="poster" />
    </div>
  );
};

export default MovieDetail;
