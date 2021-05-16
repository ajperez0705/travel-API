class PopDestinationView {
  #parentEl = document.querySelector(".carousel__container");
  #data;

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

  render(data) {
    this.#data = data;
    this.#generateDestinationMarkup(this.#data);
  }

  addHandlerRender(handler) {
    handler();
  }

  #generateDestinationMarkup(data) {
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
          </a>aAZ
          `;
      this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

export default new PopDestinationView();
