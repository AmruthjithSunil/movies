import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function clickHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    setMovies(
      data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      })
    );
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={clickHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <>Loading...</>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
