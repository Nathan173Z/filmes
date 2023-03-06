import axios from "axios";

export const key = "d41aac912e8628239b8bd03a8d7ce23d";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});