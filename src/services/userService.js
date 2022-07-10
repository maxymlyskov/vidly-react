import httpService from "./httpService";

export function register(user) {
  return httpService.post(`/users`, {
    email: user.username,
    password: user.password,
    name: user.name,
    isAdmin: true,
  });
}
