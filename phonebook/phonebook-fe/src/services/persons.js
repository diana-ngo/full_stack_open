import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data);

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);
};

export default { create, getAll, update, remove };
