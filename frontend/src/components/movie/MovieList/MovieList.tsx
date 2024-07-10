import React from "react";
import {Link} from "react-router-dom";
import styles from "./css/MovieList.module.css";


interface MovieListProps {
  response: MovieListType[];
}

const MovieList: React.FC<MovieListProps> = ({ response }) => {
  return (
    <>
      {response.map((i) => (
        <div className={styles.block} key={i.id}>
          <Link className={styles.link_block} to={`/detail/${i.id}`}>
            <div className={styles.poster_item}>
              <img alt="" id="poster" className={styles.poster_item} src={i.poster} />
            </div>
            <div className={styles.content_block}>
              <div className={styles.block_title}>
                <span className={styles.text_title}>{i.title}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default MovieList;
