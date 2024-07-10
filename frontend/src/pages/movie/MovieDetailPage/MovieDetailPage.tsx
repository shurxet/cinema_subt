// src/pages/MovieDetailPage.tsx

import styles from "./css/MovieDetailPage.module.css";
import { useParams } from "react-router-dom";
import {useMovieDetail} from "../../../hooks/movieHooks/useMovieDetail.tsx";
import Poster from "../../../components/movie/MovieDetail/Poster.tsx";
import TextContent from "../../../components/movie/MovieDetail/TextContent.tsx";
import Seasons from "../../../components/movie/MovieDetail/Seasons.tsx";
import {API_URL, seriesPath} from "../../../services/client/apiClient.tsx";


function MovieDetailPage() {
  const params = useParams<{ id: string }>();
  const itemId = params.id ? parseInt(params.id, 10) : null;
  const { movie, error } = useMovieDetail(itemId);

  const handlerSeasonNumber = (item: Season) => {
    const seriesMenu = document.getElementById('seriesMenu');

    if (seriesMenu) {
      seriesMenu.innerHTML = '';
      if (item) {
        item.series.forEach(function (item) {
          const seriesBlock = document.createElement('div');
          seriesBlock.classList.add(styles.series_block);
          seriesMenu.appendChild(seriesBlock);
          seriesBlock.textContent = `${item.series_number} - ${item.title}`;
          seriesBlock.addEventListener('click', function () {
            window.location.href = `${API_URL}${seriesPath}${item.id}`;
          })
        })
      }
    } else {
      console.error('seriesMenu element not found');
    }
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (movie) {
    return (
        <>
          <div className={styles.content_container}>
            <Poster poster={movie.poster}/>
            <TextContent response={movie}/>
          </div>
          <Seasons seasons={movie.seasons} onSeasonClick={handlerSeasonNumber}/>
          <div className={styles.series_menu} id="seriesMenu"></div>
        </>
    )
  } else {

    return (
        <div>Loading...</div>
    )
  }
}

export default MovieDetailPage;
