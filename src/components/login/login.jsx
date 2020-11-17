import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ authService }) => {
  const history = useHistory();
  const gotoMain = userID => {
    history.push({
      pathname: "/",
      state: { id: userID },
    });
  };
  const onLogin = event => {
    authService //
      .login(event.currentTarget.textContent)
      .then(data => gotoMain(data.user.uid));
  };
  useEffect(() => {
    authService.onAuthChange(user => {
      user && gotoMain(user.uid);
    });
  });
  return (
    <section>
      <header>header</header>
      <section>
        <h1>login</h1>
        <ul>
          <li>
            <button onClick={onLogin}>Google</button>
          </li>
          {/* <li>
            <button>Github</button>
          </li> */}
        </ul>
      </section>
      <footer>footer</footer>
    </section>
  );
};

export default Login;
