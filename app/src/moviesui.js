import { useEffect, useState } from "react";
import { movies$ } from "./movies";
import Card from "./card";
import "./App.css";

export default function Moviesui() {
  const [movies, setMovies] = useState([]);
  const [copymovies, setCopymovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, useSelected] = useState();

  useEffect(() => {
    fetching();
  }, []);
  // fetch data
  const fetching = async () => {
    const data = await movies$;
    setMovies(data);
    setCopymovies(data);
    getcategories(data);
  };

  // get categories

  const getcategories = (data) => {
    const cat = data.map((m) => m.category);
    cat.unshift("All");
    setCategories(new Array(...new Set(cat)));
  };

  // handel delete movie
  const handleDelete = (id) => {
    const newmovie = movies.filter((m) => m.id !== id);
    setMovies(newmovie);
  };

  // handle like and dislike
  const handelReact = ({ type, id, histo }) => {
    const [movie] = movies.filter((m) => m.id === id);

    if (type == "like") {
      if (histo == "like") {
        movie.likes = movie.likes - 1;
        const newmovies = [...movies];
        setMovies(newmovies);
        return;
      }
    }

    if (type == "like") {
      if (histo) {
        movie.dislikes = movie.dislikes - 1;
        movie.likes = movie.likes + 1;
      } else {
        movie.likes = movie.likes + 1;
      }
    }
    if (type == "dislike") {
      if (histo) {
        movie.likes = movie.likes - 1;
        movie.dislikes = movie.dislikes + 1;
      } else {
        movie.dislikes = movie.dislikes + 1;
      }
    }
    const newmovies = [...movies];
    setMovies(newmovies);
  };

  //
  // HANDLE SELECT
  const handleSelect = (e) => {
    const category = e.target.value;
    if (category == "All") return setMovies(copymovies);
    const newmovies = copymovies.filter((m) => m.category == category);
    if (newmovies) setMovies(newmovies);
  };

  return (
    <div>
      <div>
        {movies && (
          <select onChange={handleSelect}>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        )}
      </div>
      <div className="grid-container">
        {movies.map((m) => (
          <Card
            movie={m}
            key={m.id}
            onDelete={handleDelete}
            onReact={handelReact}
          ></Card>
        ))}
      </div>
    </div>
  );
}
