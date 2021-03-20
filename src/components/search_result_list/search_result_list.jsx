import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getSearchList } from "../../service/listBuilder";
import { dummyFetcher } from "../../service/util";
import MoiveItem from "../movie_item/movie_item";

const SearchResultList = ({ searchWord }) => {
  // const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getSearchList(1, searchWord);
      console.log(response);
      setSearchList([...response]);
      // console.log(searchList);
    }

    fetchData();
  }, [searchWord]);

  return (
    <ul>
      {/* <div>{searchWord}</div> */}
      {searchList.map((e, idx) => (
        <MoiveItem key={idx} movie={e} ranking={idx} />
      ))}
    </ul>
  );
};

export default SearchResultList;
