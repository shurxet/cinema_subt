// src/components/movie/MovieDetail/Poster.tsx

import styles from "./css/MovieDetail.module.css";
import React from "react";

interface Props {
  poster: string;
}

const Poster: React.FC<Props> = ({ poster }) => {
  return (
    <div className={styles.poster_content}>
      <div className={styles.img_container}>
        <img alt="" className={styles.poster_img} id="poster" src={poster} />
        <span className={styles.top}></span>
        <span className={styles.right}></span>
        <span className={styles.bottom}></span>
        <span className={styles.left}></span>
      </div>
    </div>
  );
}

export default Poster;
