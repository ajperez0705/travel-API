// Importing from the model
import * as model from "./model.js";
import * as config from "./config.js";

// Importing Views
import popDestinationView from "./views/popDestinationView";
import navView from "./views/navView.js";
import modalView from "./views/modalView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";

// import "core-js/stble";
import "regenerator-runtime/runtime";
// import { async, mark } from "regenerator-runtime/runtime";
import icons from "../Images/icons.svg";
import { search } from "core-js/fn/symbol";

// API - https://restcountries.eu/
// Country Codes - https://countrycode.org/
/**********************************************************************************************************/

/******************************Spinner*************************************/

/******************************Loading Pop Countries******************************/

// 1. Fetch the API
const loadHome = async function () {
  try {
    const popCountriesData = await model.loadPopCountries(model.popCountries);

    if (!popCountriesData) return;

    // Render
    popDestinationView.render(popCountriesData);
  } catch (err) {
    console.error(err);
  }
};

const controlNav = function (data) {
  let navData = model.navChange(data);
  const targetData = navData[0];
  const clickedData = navData[1];

  // Render
  navView.render(targetData, clickedData);
};

const modalControl = async function (destinationBtn) {
  const countryCode = model.setCountryCode(destinationBtn);
  if (!countryCode) return;

  modalView.toggleModal(config.modalContainer, config.overlay);

  try {
    let countryData = await model.countryModalDetails(countryCode);
    // if (!COUNTRY_CODE) return;

    modalView.render(countryData);
  } catch (err) {
    console.error(err);
  }
};

const modalClose = function (ev) {
  model.closeModal(ev);
};

const controlSearchRes = async function () {
  // Clears the previous search
  model.clearSearchResults(config.SEARCH_CONTAINER);

  try {
    // Grabs the value of the search input
    const query = searchView.getQuery();
    if (!query) return;

    // Requests countries based on query
    await model.searchResults(query);

    // Render the search results
    searchView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`${err} found in search call within model`);
  }
};

const controlPagination = function (goToPage) {
  // Render NEW search results
  searchView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

// Pub - Sub Pattern
const init = function () {
  popDestinationView.addHandlerRender(loadHome);
  navView.navHandlerClick(controlNav);
  modalView.modalHandlerClick(modalControl);
  modalView.modalHandlerCloseRe(modalClose);
  searchView.addHandlerSearch(controlSearchRes);
  paginationView.addHandlerClick(controlPagination);
};

init();

/******************************Modal Controller******************************/

/******************Search API*************************/
