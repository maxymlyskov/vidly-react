import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/Like";
import auth from "../services/authService";
import Table from "./common/Table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      name: "Title",
      content: (movie) => <Link to={`/movie/${movie._id}`}>{movie.name}</Link>,
    },
    { path: "genre.name", name: "Genre" },
    { path: "numberInStock", name: "Stock" },
    { path: "dailyRentalRate", name: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          key={movie._id}
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) =>
      auth.getCurrentUser() &&
      auth.getCurrentUser().isAdmin && (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        movies={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
