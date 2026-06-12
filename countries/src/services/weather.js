import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = (capitalLat, capitalLon) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLon}&appid=${apiKey}&units=metric`,
    )
    .then((response) => response.data);
};

export default { getWeather };
