import httpService from "./httpService";

const getGenres = () => {
  return httpService.get(`/genres`);
};

export { getGenres };
