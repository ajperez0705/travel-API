import { async, mark } from "regenerator-runtime/runtime";
import destinationView from "./views/destinationModalView";

export const state = {
  popDestination: {},
};

const popCountriesContainer = document.querySelector(".carousel__container");
const title = document.querySelector(".home-title");
const contentContainer = document.querySelector(".content-container");
const modalContainer = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");

const navContainer = document.querySelector(".nav-bar");
const navLinks = document.querySelectorAll(".nav-link");
const navBtns = document.querySelectorAll(".nav-btn");
const contentContainers = document.querySelectorAll(".container");

export const popCountries = ["USA", "FRA", "MEX", "DEU", "BRA"];

// 1. Load the home screen
export const loadPopCountries = async function (popCountries) {
  const popCountriesData = [];

  const countryArr = popCountries.map(async (country) => {
    try {
      // renderSpinner(popCountriesContainer);
      const res = await fetch(
        `https://restcountries.eu/rest/v2/alpha/${country}`
      );
      const data = res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
    const countryCode = window.location.hash.slice(1);
    if (!countryCode) return;

    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
    const data = await res.json();
    console.log(data);

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    let countryDetails = data;
    countryDetails = {
      name: countryDetails.name,
      capital: countryDetails.capital,
      alphaCode: countryDetails.alpha3Code,
      flag: countryDetails.flag,
      language: countryDetails.languages[0].name,
      population: countryDetails.population,
      currency: countryDetails.currencies[0].name,
    };

    let markup = `
      <div class="hero-image" style="background-image: url(${countryDetails.flag});">
            
          <div class="save-search-btn-container">
            <span class="save-search"><i  id = heart class="far fa-heart" aria-hidden="true" ></i></a>
          </div>
          <div class="modal-title">
            <h6 class="capital">${countryDetails.capital}</h6>
            <h3 class="country-name">${countryDetails.name}</h3>
          </div>
        </div>
        <div class="modal-grid">
            <div class="modal-card" id="language">
              <h5 class="modal-card-title">Language</h5>
              <p class="modal-card-content">${countryDetails.language}</p>
            </div>
            <div class="modal-card" id="capital">
              <h5 class="modal-card-title">Capital</h5>
              <p class="modal-card-content">${countryDetails.capital}</p>
            </div>
            <div class="modal-card" id="bio">
              <h5 class="modal-card-title">Bio</h5>
              <p class="modal-card-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam unde id ipsum vel officiis soluta, impedit, illo, repellendus maxime dicta repudiandae? Ea omnis optio quae sed fugiat pariatur quia sunt.</p>
            </div>
            <div class="modal-card" id="population">
              <h5 class="modal-card-title">Population</h5>
              <p class="modal-card-content">${countryDetails.population}</p>
            </div>
            <div class="modal-card" id="Currency">
              <h5 class="modal-card-title">Currency</h5>
              <p class="modal-card-content">${countryDetails.currency}</p>
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
