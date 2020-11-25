import React from "react";
import styles from "./actor.module.css";
const Actor = ({ actor }) => {
  return (
    <li className={styles.actor}>
      <div
        className={styles.imagewrap}
        style={
          actor.profile_path && {
            background: `url('https://image.tmdb.org/t/p/w500${actor.profile_path}')`,
            backgroundPosition: "center ,center",
            backgroundSize: "100%",
          }
        }
      >
        {/* <img
          className={styles.image}
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : null
          }
          alt=""
        /> */}
      </div>
      <div className={styles.actorDetail}>
        <div className={styles.name}>{actor.name}</div>
        <div className={styles.character}>{`${actor.character} 역`}</div>
      </div>
    </li>
  );
};

export default Actor;
