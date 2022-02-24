import React from "react";
import { useState } from "react";
import like from "./likes.svg";
import dislike from "./dislikes.svg";

export default function Card({ movie, onDelete, onReact }) {
  const [liked, setLiked] = useState("");
  const [disliked, setDisliked] = useState("");
  const likes = (id) => {
    liked
      ? console.log("liked before")
      : onReact({ type: "like", id, histo: disliked });
    setLiked("like");
    setDisliked("");
  };
  const dislikes = (id) => {
    disliked
      ? console.log("clicked dislike")
      : onReact({ type: "dislike", id, histo: liked });
    setDisliked("dislike");
    setLiked("");
  };

  return (
    <>
      <div className=" item card-container">
        <h2>{movie.title}</h2>
        <h5>{movie.category}</h5>
        <div className="reaction">
          <button className="like">
            <img src={like} onClick={() => likes(movie.id)} />
            <span>{movie.likes}</span>
          </button>

          <button className="dislike">
            <img src={dislike} onClick={() => dislikes(movie.id)} />
            <span>{movie.dislikes}</span>
          </button>
          <div className="delete" onClick={() => onDelete(movie.id)}>
            Delete 💥
          </div>
        </div>
      </div>
    </>
  );
}
