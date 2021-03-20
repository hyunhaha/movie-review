import React, { useState } from "react";
import { useEffect } from "react";
import { getSearchList } from "../../service/listBuilder";
import { dummyFetcher } from "../../service/util";
import MovieList from "../movie_list/movie_list";
import SearchBar from "../search_bar/search_bar";
import SearchResultList from "../search_result_list/search_result_list";
import styles from "./search_result.module.css";
const SearchResult = ({ searchWord, movies, movieDB }) => {
  const [searchbar, setSearchbar] = useState(
    window.innerWidth <= 425 ? true : false
  );
  const [moviesInSmall, setMoviesInSmall] = useState([]);

  const [searchList, setSearchList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  useEffect(() => {
    let mounted = true;
    const handleResize = () => {
      const windowWidth = window.innerWidth <= 425;
      if (windowWidth) {
        setSearchbar(true);
      } else {
        setSearchbar(false);
      }
    };
    window.addEventListener("resize", () => {
      mounted && handleResize();
    });
    return () => {
      mounted = false;
    };
  }, []);

  // useEffect(() => {
  //   console.log(searchWord);
  //   async function fetchData() {
  //     setSearchLoading(true);
  //     const response = await getSearchList(1, searchWord);
  //     console.log(response);
  //     setSearchList([...response]);
  //     setSearchLoading(false);
  //   }
  //   searchWord && fetchData();
  // }, [searchWord]);

  const onSearch = query => {
    movieDB
      .search(query) //
      .then(items => {
        setMoviesInSmall(items);
      });
  };
  return (
    <div className={styles.movie}>
      {searchbar ? (
        <div>
          <div className={styles.searchbarWrap}>
            <SearchBar onSearch={onSearch} />
          </div>
          {
            moviesInSmall.length === 0 ? <h1>검색 결과가 없습니다.</h1> : null
            // (
            //   <MovieList movies={moviesInSmall} />
            // )
          }
        </div>
      ) : searchWord ? (
        <SearchResultList searchWord={searchWord} searchList={searchList} />
      ) : (
        // <MovieList
        //   items={searchList}
        //   loading={searchLoading}
        //   setPage={setSearchPage}
        //   page={searchPage}
        // />
        <h1>검색 결과가 없습니다.</h1>
      )}
    </div>
  );
};

export default SearchResult;
