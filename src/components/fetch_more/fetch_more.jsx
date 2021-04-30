import React, { useEffect } from "react";
import { useRef } from "react";
import Loading from "../loading/loading";
import styles from "./fetch_more.module.css";
const FetchMore = ({ loading, setPage }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      setPage(page => page + 1);
    }
  });
  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, []);
  return (
    <div
      ref={fetchMoreTrigger}
      id={styles.fetchMore}
      className={loading ? styles.loading : undefined}
    >
      <Loading />
    </div>
  );
};

export default FetchMore;
