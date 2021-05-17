import MasterView from "./masterView";

class PopDestinationView extends MasterView {
  _parentEl = document.querySelector(".carousel__container");
  _errorMessage = "No destinations could be loaded";
  _successMessage = "";

  render(data) {
    this._generateDestinationMarkup(data);
  }

  addHandlerRender(handler) {
    handler();
  }

  _generateDestinationMarkup(data) {
    data.forEach((country) => {
      let markup = `
          <a href="#${country.alphaCode}">
            <div id="#${country.alphaCode}" class="carousel-item destination-btn"  style="background-image: url(${country.flag});">
              <div class="info">
                <h4 class="country-name">${country.name}</h4>
                <div class="stars">
                   <i class="fas fa-star"></i> 4.5
                </div>
              </div>
           </div>
          </a>
          `;
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

// Spinner is not working yet
// renderSpinner = function (parentEl) {
//   const markup = `<div class="spinner">
//   <svg>
//     <use href="${icons}.svg_icon-loader"></use>
//   </svg>
// </div>
// `;
//   parentEl.innerHTML = "";
//   parentEl.insertAdjacentHTML("afterbegin", markup);
// };

export default new PopDestinationView();
