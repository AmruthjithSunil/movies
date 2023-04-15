import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://swapi.dev/api/films");
        if (!response.ok) {
          throw new Error("Something went wrong ...Retrying");
        }
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
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  const clickHandler = useCallback(async function () {
    if (cancel) {
      console.log("cancelled");
      setCancel(false);
      setError(null);
      return;
    }
    console.log("clicked");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying");
      }
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
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    if (error) {
      setInterval(clickHandler, 5000);
    }
  });

  const cancelHandler = useCallback(function () {
    setCancel(true);
  });

  return (
    <React.Fragment>
      <section>
        <button onClick={clickHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <>Loading...</>}
        {error && (
          <>
            {error}
            <button onClick={cancelHandler}>Cancel</button>
          </>
        )}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
