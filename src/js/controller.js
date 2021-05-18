// Importing from the model
import * as model from "./model.js";
import * as config from "./config.js";

// Importing Views
import popDestinationView from "./views/popDestinationView";
import navView from "./views/navView.js";
import modalView from "./views/modalView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import saveView from "./views/saveView";
import bookedView from "./views/bookedView";

// import "core-js/stble";
import "regenerator-runtime/runtime";
import { search } from "core-js/fn/symbol";

// API - https://restcountries.eu/
// Country Codes - https://countrycode.org/
/**********************************************************************************************************/

/******************************Spinner*************************************/

/******************************Loading Pop Countries******************************/

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

const controlNav = function (btn, data) {
  let navData = model.navChange(btn);

  const targetData = navData[0];
  const clickedData = navData[1];

  navView.renderNav(targetData, clickedData);
};

const modalControl = async function (destinationBtn) {
  const countryCode = model.setCountryCode(destinationBtn);
  if (!countryCode) return;

  modalView.toggleModal(config.modalContainer, config.overlay);

  try {
    let countryData = await model.countryModalDetails(countryCode);
    // if (!COUNTRY_CODE) return;

    modalView.renderModal(countryData);
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
    searchView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // Render NEW search results
  searchView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlAddSave = function () {
  // Add/Remove Save
  if (!model.state.countryDetails.saved) {
    model.addSave(model.state.countryDetails);
    saveView.clear();

    saveView.render(model.state.saved);
  } else {
    model.deleteSave(model.state.countryDetails.alphaCode);
    saveView.clear();
    saveView.render(model.state.saved);
  }

  // Update the Modal View
  modalView.update(model.state.countryDetails);
};

const controlSaves = function () {
  saveView.render(model.state.saved);
};

const clearSaves = function () {
  model.clearStorage();
  saveView.clear();
};

const bookDestination = function () {};

// Pub - Sub Pattern
const init = function () {
  // Load Home Screen
  popDestinationView.addHandlerRender(loadHome);
  saveView.addHandlerRender(controlSaves);

  // Nav Control
  navView.navHandlerClick(controlNav);

  // Modal Control
  modalView.modalHandlerClick(modalControl);
  modalView.modalHandlerCloseRe(modalClose);
  modalView.addSaveDestination(controlAddSave);
  modalView.addHandlerBook(bookDestination);

  // Search Control
  searchView.addHandlerSearch(controlSearchRes);
  paginationView.addHandlerClick(controlPagination);

  // Control Saved Destinations
  saveView.addHandlerClearSaves(clearSaves);

  // Control Booked Destinations
};

init();

/******************************Modal Controller******************************/

/******************Search API*************************/
