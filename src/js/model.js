import { async, mark } from "regenerator-runtime/runtime";
import destinationView from "./views/destinationModalView";
import * as config from "./config.js";
import { getJSON } from "./helpers.js";

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
  try {
    if (!countryCode) return;

    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
    const data = await res.json();
    console.log(data);

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    let countryData = data;
    state.countryDetails = {
      name: countryData.name,
      capital: countryData.capital,
      alphaCode: countryData.alpha3Code,
      flag: countryData.flag,
      language: countryData.languages[0].name,
      population: countryData.population,
      currency: countryData.currencies[0].name,
    };

    let markup = `
      <div class="hero-image" style="background-image: url(${countryData.flag});">
            
          <div class="save-search-btn-container">
            <span class="save-search"><i  id = heart class="far fa-heart" aria-hidden="true" ></i></a>
          </div>
          <div class="modal-title">
            <h6 class="capital">${countryData.capital}</h6>
            <h3 class="country-name">${countryData.name}</h3>
          </div>
        </div>
        <div class="modal-grid">
            <div class="modal-card" id="language">
              <h5 class="modal-card-title">Language</h5>
              <p class="modal-card-content">${countryData.language}</p>
            </div>
            <div class="modal-card" id="capital">
              <h5 class="modal-card-title">Capital</h5>
              <p class="modal-card-content">${countryData.capital}</p>
            </div>
            <div class="modal-card" id="bio">
              <h5 class="modal-card-title">Bio</h5>
              <p class="modal-card-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam unde id ipsum vel officiis soluta, impedit, illo, repellendus maxime dicta repudiandae? Ea omnis optio quae sed fugiat pariatur quia sunt.</p>
            </div>
            <div class="modal-card" id="population">
              <h5 class="modal-card-title">Population</h5>
              <p class="modal-card-content">${countryData.population}</p>
            </div>
            <div class="modal-card" id="Currency">
              <h5 class="modal-card-title">Currency</h5>
              <p class="modal-card-content">${countryData.currency}</p>
           </div>
          <div class="btn-container">
              <button class="modal-btn" id="cancel-btn"><a href="#"></a>Cancel</button>
              <button class="modal-btn" id="book-btn"><a href="#"></a>Book</button>
          </div>
        </div>
      `;
    modalContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(`${err} 🔥🔥🔥`);
  }
};

/******************Nav Controller*************************/
export const navChange = function () {
  let target, clickedLink, navData;
  config.navBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      target = e.target;
      clickedLink = this.id;
      console.log(target);
      navData = [target, clickedLink];
      console.log(navData);
      return navData;
    });
  });
};
