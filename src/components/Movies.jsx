import React, { Component } from "react";
import { paginate } from "./utils/paginate";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import SearchBox from "./SearchBox";
import MoviesTable from "./MoviesTable";
// import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedItem: 1,
    searchQuery: "",
    selectedGenre: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres: [{ _id: "", name: "All Genres" }, ...genres],
    });
  }
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: 1, currentPage: 1 });
  };

  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((movie) => movie._id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("This movie has already been deleted.");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
      selectedGenre,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      genres,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();
    const { user } = this.props;

    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              key={selectedGenre}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/movies/new">
                <button className="btn btn-primary">New Movie</button>
              </Link>
            )}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            <>
              <h1>
                There are <span>{totalCount}</span> movies
              </h1>
              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </>
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
