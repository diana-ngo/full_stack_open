import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";

const SingleCountryDisplay = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.entries(country.languages);
  const [capitalLat, capitalLon] = [
    country.capitalInfo.latlng[0],
    country.capitalInfo.latlng[1],
  ];

  useEffect(() => {
    weatherService
      .getWeather(capitalLat, capitalLon)
      .then((returnedWeather) => setWeather(returnedWeather));
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map(([langCode, langName]) => (
          <li key={langCode}>{langName}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      {weather && (
        <>
          <h2>Weather in {country.capital}</h2>
          <div>Temperature: {weather.main.temp.toFixed(2)} celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>Wind: {weather.wind.speed} m/s</div>
        </>
      )}
    </>
  );
};

const CountryDisplay = ({ countries, setSelectedCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return countries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}
        <button
          onClick={() => {
            setSelectedCountry(country);
          }}
        >
          Show
        </button>
      </div>
    ));
  }

  if (countries.length === 1) {
    return <SingleCountryDisplay country={countries[0]} />;
  }
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div>
        <form>
          find countries
          <input
            value={search}
            onChange={(e) => {
              setSelectedCountry(null);
              setSearch(e.target.value);
            }}
          />
        </form>
        {search ? (
          selectedCountry ? (
            <SingleCountryDisplay country={selectedCountry} />
          ) : (
            <CountryDisplay
              countries={filteredCountries}
              setSelectedCountry={setSelectedCountry}
            />
          )
        ) : null}
      </div>
    </>
  );
}

export default App;
