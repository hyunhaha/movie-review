import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./login.module.css";
const Login = ({ authService }) => {
  const history = useHistory();
  const gotoMain = useCallback(
    userID => {
      // history.push({
      //   pathname: "/",
      //   state: { id: userID },
      // });
      history.push("/");
      window.localStorage.setItem("userId", userID);
    },
    [history]
  );
  // console.log(useHistory().state);
  const onLogin = event => {
    authService //
      .login(event.currentTarget.textContent);
    // .then(data => gotoMain(data.user.uid));
  };
  // useEffect(() => {
  //   authService.onAuthChange(user => {
  //     if (user) {
  //       gotoMain(user.uid);
  //     }
  //   });
  // }, [authService, gotoMain]);
  return (
    <section className={styles.login}>
      <header>로그인이 필요합니다</header>
      <section>
        <h1>login</h1>
        <ul className={styles.list}>
          <li>
            <button className={styles.google_login} onClick={onLogin}>
              Google
            </button>
          </li>
          {/* <li>
            <button>Github</button>
          </li> */}
        </ul>
      </section>
    </section>
  );
};

export default Login;
