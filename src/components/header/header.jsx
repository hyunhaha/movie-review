import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../search_bar/search_bar";
import styles from "./header.module.css";

const Header = ({ onSearch, authService }) => {
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState("transparent");
  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
  });
  useEffect(() => {
    const onScroll = () => {
      const position = window.scrollY > 80;
      if (position) {
        setHeaderOpacity("solid");
      } else {
        setHeaderOpacity("transparent");
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.addEventListener("scroll", onScroll);
    };
  }, []);
  const gotoLoginPage = () => {
    history.push("/login");
  };

  const onSearchWord = query => {
    onSearch(query);
  };

  const goMyPage = () => {
    history.push("/my-review");
  };

  return (
    <div
      className={headerOpacity === "solid" ? styles.header : styles.transparent}
    >
      <ul className={styles.list}>
        <li className={styles.list_logo}>
          <a href="/" className={styles.logo_link}>
            <img className={styles.logo} src="/images/logo.png" alt="logo" />
          </a>
        </li>
        <li className={styles.list_searchbar}>
          <div className={styles.searchbar}>
            <SearchBar onSearch={onSearchWord} />
          </div>
        </li>
        <li>
          {login ? (
            <div className={styles.loginCase}>
              <button
                className={styles.myPageButton}
                onClick={goMyPage}
              ></button>
              <div className={styles.myPageTitle}>My Page</div>
            </div>
          ) : (
            <button className={styles.loginButton} onClick={gotoLoginPage}>
              login
            </button>
          )}
        </li>
        {/* <li>
          <button
            className={styles.reviewButton}
            onClick={login ? gotoReveiwPage : gotoLoginPage}
          >
            my review
          </button>
        </li> */}
      </ul>
    </div>
  );
};

export default Header;
