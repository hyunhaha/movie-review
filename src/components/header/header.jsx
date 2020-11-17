import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../search_bar/search_bar";
import styles from "./header.module.css";
const Header = ({ onSearch, authService }) => {
  const history = useHistory();
  const [login, setLogin] = useState(false);

  const onButtonClick = () => {
    history.push("/login");
  };
  const onSearchWord = query => {
    onSearch(query);
  };
  const onLogout = () => {
    authService.logout();
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
  const onLogoClick = () => {
    history.push("/");
  };
  return (
    <div className={styles.header}>
      <img
        onClick={onLogoClick}
        className={styles.logo}
        src="/images/logo.png"
        alt="logo"
      />
      <div className={styles.searchbarAndlogin}>
        <div className={styles.searchbar}>
          <SearchBar onSearch={onSearchWord} />
        </div>
        <button
          className={login ? styles.logoutbutton : styles.loginbutton}
          onClick={login ? onLogout : onButtonClick}
        >
          {login ? "logout" : "login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
