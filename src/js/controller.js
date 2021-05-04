// Importing from the model
import * as model from "./model.js";
import * as config from "./config.js";
import destinationModalView from "./views/destinationModalView";
import popDestinationView from "./views/popDestinationView";
import navView from "./views/navView.js";

// import "core-js/stble";
import "regenerator-runtime/runtime";
import { async, mark } from "regenerator-runtime/runtime";
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

const controlNav = function () {
  const { targetData, clickedData } = model.navChange();

  console.log(targetData, clickedData);

  // Render
  navView.render(targetData, clickedData);
};

// Pub - Sub Pattern
const init = function () {
  popDestinationView.addHandlerRender(loadHome);
  navView.addHandlerRender(controlNav);
};

init();

/******************************Modal Controller******************************/

const modalController = function () {
  // Control Modal popup logic

  config.modalContainer.classList.toggle("hidden");
  config.overlay.classList.toggle("hidden");

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalContainer.classList.contains("hidden")) {
      config.modalContainer.classList.toggle("hidden");
      config.overlay.classList.toggle("hidden");
      window.location.hash = "";
      config.modalContainer.innerHTML = "";
    }
  });
};

/***********Click on card and activate modal + render country details************/
// Gain access to the parent class (content-container) and add an event listener that checks for e === destination-btn
// config.contentContainer.addEventListener("click", function (e) {
//   e.preventDefault();
//   const destinationBtn = e.target;
//   // If e === destination-btn, then toggle hidden class in modal container
//   if (destinationBtn.classList.contains("destination-btn")) {
//     console.log(destinationBtn.id);
//     window.location.hash = destinationBtn.id;
//     modalController();

//     // Render the country details dependind on the hash alpha code
//     countryModal();
//   }
// });

/******************Search API*************************/
