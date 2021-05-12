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

  modalView._toggleModal(config.modalContainer, config.overlay);

  try {
    let countryData = await model.countryModalDetails(countryCode);
    console.log(countryData);
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
  try {
    const query = searchView.getQuery();
    if (!query) return;

    // const searchResults = await model.searchResults(query);
    // console.log(searchResults);

    await model.searchResults(query);
    console.log(model.state.search.results);

    // Render the search results
    searchView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`${err} found in search call within model`);
  }
};

// Pub - Sub Pattern
const init = function () {
  popDestinationView.addHandlerRender(loadHome);
  navView.navHandlerClick(controlNav);
  modalView.modalHandlerClick(modalControl);
  modalView.modalHandlerCloseRe(modalClose);
  searchView.addHandlerSearch(controlSearchRes);
};

init();

/******************************Modal Controller******************************/

/******************Search API*************************/
