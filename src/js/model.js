import { async, mark } from "regenerator-runtime/runtime";
import destinationView from "./views/destinationModalView";
import * as config from "./config.js";
import { getJSON } from "./helpers.js";
import navView from "./views/navView";

export const state = {
  popDestination: {},
  countryDetails: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: config.RES_PER_PAGE,
  },
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

export const setCountryCode = function (el) {
  if (!el) return;

  window.location.hash = el.id;

  return window.location.hash.slice(1);
};

// Home
// X. Render the country details on click inside of the modal
export const countryModalDetails = async function (countryCode) {
  // if (!COUNTRY_CODE) return;
  try {
    const data = await getJSON(`${config.API_URL}/${countryCode}`);
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

export const closeModal = function (ev) {
  if (
    (ev.key === "Escape" &&
      !config.modalContainer.classList.contains("hidden")) ||
    (ev.target.closest(".cancel-btn") &&
      !config.modalContainer.classList.contains("hidden"))
  ) {
    config.modalContainer.classList.add("hidden");
    config.overlay.classList.add("hidden");
    window.location.hash = "";
    config.modalContainer.innerHTML = "";
    state.countryDetails = {};
  } else return;
};

// export const closeModal = function () {
//   config.modalContainer.classList.add("hidden");
//   config.overlay.classList.add("hidden");
//   window.location.hash = "";
//   config.modalContainer.innerHTML = "";
//   console.log(state.country);
//   state.countryDetails = {};
// };
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

export const searchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${config.API_SEARCH}/${query}`);

    state.search.results = data.map((country) => {
      return {
        name: country.name,
        capital: country.capital,
        flag: country.flag,
        alphaCode: country.alpha3Code,
      };
    });
  } catch (err) {
    console.error(`${err} found in search call within model`);
  }
};

// To extract the data
//

// Pagination
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const clearSearchResults = function (content) {
  state.search.results = [];
  state.search.query = "";
  content.innerHTML = "";
};

export const saveDestination = function (btn) {
  if (!btn) return;

  if (btn.classList.contains("far")) {
    btn.classList.remove("far");
    btn.classList.add("fas");
  } else if (btn.classList.contains("fas")) {
    btn.classList.remove("fas");
    btn.classList.add("far");
  }
};
