// Importing from the model
import * as model from "./model.js";
import * as config from "./config.js";

// Importing Views
import popDestinationView from "./views/popDestinationView";
import navView from "./views/navView.js";
import modalView from "./views/modalView.js";

// import "core-js/stble";
import "regenerator-runtime/runtime";
// import { async, mark } from "regenerator-runtime/runtime";
import icons from "../Images/icons.svg";

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

const modalControl = async function () {
  modalView._toggleModal(config.modalContainer, config.overlay);

  try {
    const countryData = await model.countryModal();
    console.log(countryData);
    // if (!COUNTRY_CODE) return;

    modalView.render(countryData);
  } catch (err) {
    console.error(err);
  }
};

// Pub - Sub Pattern
const init = function () {
  popDestinationView.addHandlerRender(loadHome);
  navView.navHandlerClick(controlNav);
  modalView.modalHandlerClick(modalControl);
};

init();

/******************************Modal Controller******************************/

/******************Search API*************************/
