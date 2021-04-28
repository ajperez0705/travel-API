// import "core-js/stble";
import "regenerator-runtime/runtime";
import { async, mark } from "regenerator-runtime/runtime";
import icons from "../Images/icons.svg";

const popCountriesContainer = document.querySelector(".carousel__container");
const title = document.querySelector(".home-title");
const modalContainer = document.querySelector(".modal-container");

// Use this for the destination button
// document.addEventListener( "click", someListener );

// function someListener(event){
//     var element = event.target;
//     if(element.tagName == 'A' && element.classList.contains("someBtn")){
//         console.log("hi");
//     }
// }

// API - https://restcountries.eu/
// Country Codes - https://countrycode.org/
/**********************************************************************************************************/

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
    <a href="#${popDestination.alphaCode}"><div class="carousel-item destination-btn"  style="background-image: url(${popDestination.flag});">
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

const hello = function () {
  console.log("hello");
};

// Toggle hidden class for modal container

// Home
// 1. Load the popular countries using its own function
async function countryModal() {
  try {
    const countryCode = window.location.hash.slice(1);
    console.log(countryCode);

    const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    let countryDetails = data;
    countryDetails = {
      name: countryDetails.name,
      capital: countryDetails.capital,
      alphaCode: countryDetails.alpha3Code,
      flag: countryDetails.flag,
      language: countryDetails.language[0],
      population: countryDetails.population,
      currency: countryDetails.currencies.name,
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
            <h5 class="modal-card-title">${countryDetails.language}</h5>
            <p class="modal-card-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam unde id ipsum vel officiis soluta, impedit, illo, repellendus maxime dicta repudiandae? Ea omnis optio quae sed fugiat pariatur quia sunt.</p>
          </div>
          <div class="modal-card" id="capital">
            <h5 class="modal-card-title">Capital</h5>
            <p class="modal-card-content">Lorem ipsum dolor</p>
          </div>
          <div class="modal-card" id="bio">
            <h5 class="modal-card-title">Bio</h5>
            <p class="modal-card-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam unde id ipsum vel officiis soluta, impedit, illo, repellendus maxime dicta repudiandae? Ea omnis optio quae sed fugiat pariatur quia sunt.</p>
          </div>
          <div class="modal-card" id="population">
            <h5 class="modal-card-title">Population</h5>
            <p class="modal-card-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam unde id ipsum vel officiis soluta, impedit, illo, repellendus maxime dicta repudiandae? Ea omnis optio quae sed fugiat pariatur quia sunt.</p>
          </div>
          <div class="modal-card" id="Currency">
            <h5 class="modal-card-title">Currency</h5>
            <p class="modal-card-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam unde id ipsum vel officiis soluta, impedit, illo, repellendus maxime dicta repudiandae? Ea omnis optio quae sed fugiat pariatur quia sunt.</p>
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
// 2. Create a function that renders the country details through the modal when country name class === the

// 2. Add a feature that when the hash changes to match the country name, call a render function
window.addEventListener("hashchange", countryModal);
