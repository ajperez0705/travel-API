// Importing from the model
import * as model from "./model.js";
import destinationModalView from "./views/destinationModalView";
import popDestinationView from "./views/popDestinationView";

// import "core-js/stble";
import "regenerator-runtime/runtime";
import { async, mark } from "regenerator-runtime/runtime";
import icons from "../Images/icons.svg";

// API - https://restcountries.eu/
// Country Codes - https://countrycode.org/
/**********************************************************************************************************/

/******************************Spinner*************************************/

const renderSpinner = function (parentEl) {
  const markup = `<div class="spinner">
  <svg>
    <use href="${icons}.svg#icon-loader"></use>
  </svg>
</div>
`;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

/******************************Loading Pop Countries******************************/

// 1. Fetch the API
const loadHome = async function () {
  try {
    const popCountriesData = await model.loadPopCountries(model.popCountries);

    // Render
    popDestinationView.render(popCountriesData);
  } catch (err) {
    console.error(err);
  }
};

loadHome();

/******************************Modal Controller******************************/

// const modalController = function () {
//   modalContainer.classList.toggle("hidden");
//   overlay.classList.toggle("hidden");

//   document.addEventListener("keydown", function (e) {
//     if (e.key === "Escape" && !modalContainer.classList.contains("hidden")) {
//       modalContainer.classList.toggle("hidden");
//       overlay.classList.toggle("hidden");
//       window.location.hash = "";
//       modalContainer.innerHTML = "";
//     }
//   });
// };

/***********Click on card and activate modal + render country details************/
// Gain access to the parent class (content-container) and add an event listener that checks for e === destination-btn
// checkDestinationBtn.addEventListener("click", function (e) {
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

/******************Nav Controller*************************/
// const navController = function () {};

// navBtns.forEach((btn) => {
//   btn.addEventListener("click", function (e) {
//     e.preventDefault();
//     const target = e.target;
//     const clickedLink = this.id;
//     console.log(clickedLink, target);

//     if (!target.classList.contains(".active-link")) {
//       navBtns.forEach((btn) => {
//         btn.classList.remove("active-link");

//         // All containers have a hidden and active class, and only one container can have active at a time
//         // Loop through all containers and if container has active, remove, and add hidden, else, return.
//         contentContainers.forEach((container) => {
//           if (container.classList.contains("active")) {
//             container.classList.remove("active");
//             container.classList.add("hidden");
//           }
//           if (container.id === clickedLink) {
//             container.classList.remove("hidden");
//             container.classList.add("active");
//           }
//           // Then, check if ids mathch, if they do, remove hidden, add active
//         });
//         target.classList.add("active-link");
//       });
//     } else return;
//   });
// });

/******************Search API*************************/
