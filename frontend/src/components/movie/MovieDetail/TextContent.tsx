// src/components/movie/MovieDetail/TextContent.tsx

import styles from "./css/MovieDetail.module.css";
import React from "react";

interface Props {
  response: MovieDetailType;
}

const TextContent: React.FC<Props> = ({ response }) => {
  return (
    <div className={styles.text_content}>
      <h1 className={styles.title}>{response.title}</h1>
      <pre>{response.plot}</pre>
      <pre>Rating: {response.rating}</pre>
      <pre>Release year: {response.release_year}</pre>
      <pre>Genres: {response.genres ? response.genres.map((genre: Genre) => genre.title).join(', ') : 'N/A'}</pre>
      <pre>Countries: {response.countries ? response.countries.map((country: { title: string }) => country.title).join(', ') : 'N/A'}</pre>
      <pre>Duration: {response.duration}</pre>
      <pre>Status: {response.status}</pre>
    </div>
  );
}

export default TextContent;
