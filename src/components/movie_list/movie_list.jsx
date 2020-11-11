import React from "react";
import MoiveItem from "../movie_item/moive_item";

const MovieList = props => (
  <ul>
    {props.movies.map(movie => (
      <MoiveItem key={movie.id} movie={movie} />
    ))}
  </ul>
);

export default MovieList;
