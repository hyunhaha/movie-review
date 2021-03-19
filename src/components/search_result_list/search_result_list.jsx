import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getSearchList } from "../../service/listBuilder";
import { dummyFetcher } from "../../service/util";

const SearchResultList = ({ searchWord, searchList }) => {
  const [list, setList] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await dummyFetcher(getSearchList, 1, searchWord);
  //     console.log(response);
  //     setSearchList([response]);
  //     console.log(searchList);
  //   }

  //   fetchData();
  // }, [searchWord]);
  useEffect(() => {
    setList([...searchList]);
  }, [searchList]);
  return (
    <ul>
      {/* <div>{searchWord}</div> */}
      {list.map((e, idx) => (
        <li key={idx}>{e.title || e.name}</li>
      ))}
    </ul>
  );
};

export default SearchResultList;
