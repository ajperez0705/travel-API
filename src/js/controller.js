// import "core-js/stble";
import "regenerator-runtime/runtime";
import { async, mark } from "regenerator-runtime/runtime";
import icons from "../Images/icons.svg";

const popCountriesContainer = document.querySelector(".carousel__container");
const title = document.querySelector(".home-title");
const checkDestinationBtn = document.querySelector(".content-container");
const modalContainer = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");

const navContainer = document.querySelector(".nav-bar");
const navLinks = document.querySelectorAll(".nav-link");
const navBtns = document.querySelectorAll(".nav-btn");
const contentContainers = document.querySelectorAll(".container");
console.log(navBtns);

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
const popCountries = ["USA", "FRA", "MEX", "DEU", "BRA"];

// 1. Fetch the API
async function showPopCountries(popCountries) {
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

  // 2. Store the fetch request inside of an object (return the object)
  countries.forEach(async (curCountry) => {
    let popDestination = curCountry;
    popDestination = {
      name: popDestination.name,
      flag: popDestination.flag,
      alphaCode: popDestination.alpha3Code,
    };

    let markup = `
    <a href="#${popDestination.alphaCode}"><div id="#${popDestination.alphaCode}" class="carousel-item destination-btn"  style="background-image: url(${popDestination.flag});">
                <div class="info">
                  <h4 class="country-name">${popDestination.name}</h4>
                  <div class="stars">
                    <i class="fas fa-star"></i> 4.5
                  </div>
                </div>
              </div>
              </a>

    `;
    popCountriesContainer.insertAdjacentHTML("afterbegin", markup);
  });
}

showPopCountries(popCountries);

/******************************Modal Controller******************************/

const modalController = function () {
  modalContainer.classList.toggle("hidden");
  overlay.classList.toggle("hidden");

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalContainer.classList.contains("hidden")) {
      modalContainer.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      window.location.hash = "";
      modalContainer.innerHTML = "";
    }
  });
};

/***********Click on card and activate modal + render country details************/
// Gain access to the parent class (content-container) and add an event listener that checks for e === destination-btn
checkDestinationBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const destinationBtn = e.target;
  // If e === destination-btn, then toggle hidden class in modal container
  if (destinationBtn.classList.contains("destination-btn")) {
    console.log(destinationBtn.id);
    window.location.hash = destinationBtn.id;
    modalController();

    // Render the country details dependind on the hash alpha code
    countryModal();
  }
});

// Home
// 1. Load the popular countries using its own function
async function countryModal() {
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
}

/******************Nav Controller*************************/
const navController = function () {};

navBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;
    const clickedLink = this.id;
    console.log(clickedLink, target);

    if (!target.classList.contains(".active-link")) {
      navBtns.forEach((btn) => {
        btn.classList.remove("active-link");

        // All containers have a hidden and active class, and only one container can have active at a time
        // Loop through all containers and if container has active, remove, and add hidden, else, return.
        contentContainers.forEach((container) => {
          if (container.classList.contains("active")) {
            container.classList.remove("active");
            container.classList.add("hidden");
          }
          if (container.id === clickedLink) {
            container.classList.remove("hidden");
            container.classList.add("active");
          }
          // Then, check if ids mathch, if they do, remove hidden, add active
        });
        target.classList.add("active-link");
      });
    } else return;
  });
});

/******************Search API*************************/
