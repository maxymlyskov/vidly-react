import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { name: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      name: movie.name,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error);
        return this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  doSubmit = async (e) => {
    // Call to the server
    await saveMovie(this.state.data);
    this.props.history.replace("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
