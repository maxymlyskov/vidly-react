import httpService from "./httpService";

function movieUrl(movieId) {
  return `/movies/${movieId}`;
}

export function getMovies() {
  return httpService.get(`/movies`);
}

export function deleteMovie(movieId) {
  return httpService.delete(movieUrl(movieId));
}

export function getMovie(movieId) {
  return httpService.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(`/movies`, body);
  }
  return httpService.post(`/movies`, movie);
}
