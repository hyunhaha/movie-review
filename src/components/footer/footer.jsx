import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = ({ authService }) => {
  const history = useHistory();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
  });
  const onHomeClick = event => {
    event.preventDefault();
    history.push("/");
  };
  const onSearchClick = event => {
    event.preventDefault();
    history.push("/search-result");
  };
  const onMyClick = event => {
    event.preventDefault();
    if (login) {
      history.push("/my-review");
    } else {
      history.push("/login");
    }
  };
  return (
    <div className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button onClick={onHomeClick} className={styles.button}>
              <i className="fas fa-home fa-2x"></i>
            </button>
            <div>홈</div>
          </li>
          <li className={styles.item}>
            <button onClick={onSearchClick} className={styles.button}>
              <i className="fas fa-search fa-2x"></i>
            </button>
            <div>검색</div>
          </li>
          <li className={styles.item}>
            <button onClick={onMyClick} className={styles.button}>
              <i className="fas fa-user fa-2x"></i>
            </button>
            <div>마이페이지</div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
