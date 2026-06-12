import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  return axios.get(`${baseUrl}/all`).then((response) => response.data);
};

const getOne = (countryName) => {
  return axios
    .get(`${baseUrl}/name/${countryName.toLowerCase()}`)
    .then((response) => response.data);
};

export default { getAll, getOne };
