import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../search_bar/search_bar";
import styles from "./header.module.css";

const Header = ({ onSearch, authService }) => {
  const history = useHistory();
  const [login, setLogin] = useState(false);
  const gotoLoginPage = () => {
    history.push("/login");
  };

  const onSearchWord = query => {
    onSearch(query);
  };
  // const onLogout = () => {
  //   authService.logout();
  //   window.localStorage.removeItem("userId");
  //   history.push("/");
  // };
  const goMyPage = () => {
    history.push("/my-review");
  };
  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
  });
  const onLogoClick = event => {
    event.preventDefault();
    history.push("/");
  };
  return (
    <div className={styles.header}>
      <ul className={styles.list}>
        <li className={styles.list_logo}>
          <img
            onClick={onLogoClick}
            className={styles.logo}
            src="/images/logo.png"
            alt="logo"
          />
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
