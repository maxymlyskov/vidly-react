import React from "react";

const MovieInfo = ({ match, history }) => {
  return (
    <div class>
      <h1>Movie Form {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieInfo;
