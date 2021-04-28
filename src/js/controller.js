import "regenerator-runtime/runtime";

const popCountriesContainer = document.querySelector(".carousel__container");
console.log(popCountriesContainer);

// API - https://restcountries.eu/
/**********************************************************************************************************/

const renderSpinner = function (parentEl) {
  const markup = `<div class="spinner">
  <svg>
    <use href="${icons}.svg#icon-loader"></use>
  </svg>
</div>`;
};

const popCountries = ["USA", "France", "Russia", "Germany", "Brazil"];

// 1. Fetch the API
async function showPopCountries(popCountries) {
  const countryArr = popCountries.map(async (country) => {
    try {
      const res = await fetch(
        `https://restcountries.eu/rest/v2/name/${country}`
      );
      const data = res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  });
  const countries = await Promise.all(countryArr);

  // 2. Store the fetch request inside of an object (return the object)
  countries.forEach(async (curCountry) => {
    console.log(curCountry[0]);
    let popDestination = curCountry[0];
    popDestination = {
      name: popDestination.name,
      flag: popDestination.flag,
    };

    let markup = `
    <div class="carousel-item" style="background-image: url(${popDestination.flag});">
      <div class="info">
         <a>
           <h4>${popDestination.name}</h4>
        </a>
        <div class="stars">
          <i class="fas fa-star"></i>
          <p>4.5</p>
        </div>
      </div>
    </div>
    `;
    // console.log(markup);
    popCountriesContainer.insertAdjacentHTML("afterbegin", markup);
  });
}

showPopCountries(popCountries);

// async function promiseAPI(popCountries) {
//   const countryArr = popCountries.map(async (country) => {
//     try {
//       const res = await fetch(
//         `https://restcountries.eu/rest/v2/name/${country}`
//       );
//       const data = res.json();

//       if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//       console.log(data);
//       return data;
//     } catch (err) {
//       console.error(err);
//     }
//   });
//   const countries = await Promise.all(countryArr);

//   // 2. Store the fetch request inside of an object (return the object)
//   countries.forEach(async (country) => {
//     console.log(country[0]);
//     let popDestination = country[0];
//     popDestination = {
//       name: popDestination.name,
//       flag: popDestination.flag,
//     };

//     const markup = `
//     <div class="carousel-item" style="background-image: url(${popDestination.flag});">
//        <div class="info">
//          <a>
//            <h4>${popDestination.name}</h4>
//         </a>
//         <div class="stars">
//           <i class="fas fa-star"></i>
//           <p>4.5</p>
//         </div>
//       </div>
//     </div>;
//     `;

//     popCountriesContainer.insertAdjacentHTML("afterbegin", markup);
//   });
// }

// 3. Render the returned object by storing them inside of a template literal
// Needs: flag and name
// `<div class="carousel-item" style="background-image: url(Images/prague.jpg);">
//   <div class="info">
//     <a>
//       <h4>Country Name</h4>
//     </a>
//     <div class="stars">
//       <i class="fas fa-star"></i>
//       <p>4.5</p>
//     </div>
//   </div>
// </div>;`;
