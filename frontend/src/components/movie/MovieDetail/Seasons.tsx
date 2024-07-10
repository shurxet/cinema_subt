// src/components/movie/MovieDetail/Seasons.tsx

import styles from "./css/MovieDetail.module.css";
import React from "react";

interface Props {
  seasons: Season[];
  onSeasonClick: (season: Season) => void;
}

const Seasons: React.FC<Props> = ({ seasons, onSeasonClick }) => {
  return (
    <div className={styles.season_menu}>
      {seasons.map(s => (
        <div
          key={s.id}
          onClick={() => onSeasonClick(s)}
          className={styles.season}
          id="season"
        >
          season {s.season_number}
        </div>
      ))}
    </div>
  );
}

export default Seasons;
