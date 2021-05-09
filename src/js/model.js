import { async, mark } from "regenerator-runtime/runtime";
import destinationView from "./views/destinationModalView";
import * as config from "./config.js";
import { getJSON } from "./helpers.js";
import navView from "./views/navView";

export const state = {
  popDestination: {},
  countryDetails: {},
};

export const popCountries = ["USA", "FRA", "MEX", "DEU", "BRA"];

// 1. Load the home screen
export const loadPopCountries = async function (popCountries) {
  const popCountriesData = [];

  const countryArr = popCountries.map(async (country) => {
    try {
      const data = await getJSON(`${config.API_URL}/${country}`);
      return data;
    } catch (err) {
      console.error(`${err} 🔥🔥🔥`);
    }
  });
  const countries = await Promise.all(countryArr);

  countries.forEach(async (curCountry) => {
    const popDestination = curCountry;
    popCountriesData.push(
      (state.popDestination = {
        name: popDestination.name,
        flag: popDestination.flag,
        alphaCode: popDestination.alpha3Code,
      })
    );
  });
  return popCountriesData;
};

// Push the created object into an array and return the array at the end

// Home
// X. Render the country details on click inside of the modal
export const countryModal = async function () {
  // if (!COUNTRY_CODE) return;
  console.log(config.COUNTRY_CODE);
  try {
    const data = await getJSON(`${config.API_URL}/${config.COUNTRY_CODE}`);
    console.log(config.COUNTRY_CODE);
    return data;
  } catch (err) {
    console.log(`Error loading the modal ${err} 🔥`);
  }
  let countryData = data;
  console.log(countryData);
  state.countryDetails = {
    name: countryData.name,
    capital: countryData.capital,
    alphaCode: countryData.alpha3Code,
    flag: countryData.flag,
    language: countryData.languages[0].name,
    population: countryData.population,
    currency: countryData.currencies[0].name,
  };
  return state.countryDetails;
};

export const checkModalOpen = function () {};

/******************Nav Controller*************************/
// export const navChange = function (e) {
//   let target, clickedLink;
//   let navData = [];
//   target = e.target;
//   clickedLink = this.id;
//   console.log(target);
//   navData = [target, clickedLink];
//   console.log(navData);
//   return navData;
// };

export const navChange = function (data) {
  return data;
};
