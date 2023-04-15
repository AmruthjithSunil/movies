import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieForm from "./components/MovieForm";

const serverLink = "https://haha-1b803.firebaseio.com/movies.json";

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
        const response = await fetch(serverLink);
        if (!response.ok) {
          throw new Error("Something went wrong ...Retrying");
        }
        const data = await response.json();

        const loadedMovies = [];
        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          });
        }

        setMovies(loadedMovies);
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
      const response = await fetch(serverLink);
      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
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

  const addMovie = useCallback(async function (movie) {
    await fetch(serverLink, {
      method: "POST",
      body: JSON.stringify(movie),
    });
    clickHandler();
  });

  const deleteMovie = useCallback(async function (id) {
    await fetch(`https://haha-1b803.firebaseio.com/movies/${id}.json`, {
      method: "DELETE",
    });
    clickHandler();
  });

  return (
    <React.Fragment>
      <section>
        <MovieForm addMovie={addMovie} />
      </section>
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
        <MoviesList movies={movies} deleteMovie={deleteMovie} />
      </section>
    </React.Fragment>
  );
}

export default App;
