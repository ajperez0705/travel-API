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
  saved: [],
};

export const popCountries = ["USA", "FRA", "MEX", "DEU", "ITA"];

/******************************Loading Home Screen******************************/
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

export const setCountryCode = function (destinationBtn) {
  if (!destinationBtn) return;

  window.location.hash = destinationBtn.id;

  return window.location.hash.slice(1);
};

export const countryModalDetails = async function (countryCode) {
  try {
    const data = await getJSON(`${config.API_URL}/${countryCode}`);

    let countryData = data;
    state.countryDetails = {
      name: countryData.name,
      capital: countryData.capital,
      alphaCode: countryData.alpha3Code,
      flag: countryData.flag,
      language: countryData.languages[0].name,
      population: countryData.population,
      currencyName: countryData.currencies[0].name,
      currencySymbol: countryData.currencies[0].symbol,
      saved: countryData.saved,
    };
    console.log(state.countryDetails);
    return state.countryDetails;
  } catch (err) {
    console.log(`Error loading the modal ${err} 🔥`);
  }
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
    // state.countryDetails = {};
  } else return;
};

export const navChange = function (btn) {
  let navData = [];
  const id = btn.id;
  if (!id) return;

  return (navData = [btn, id]);
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

export const addSave = function (destination) {
  state.saved.push(destination);
};
