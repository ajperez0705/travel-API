import { mark } from "regenerator-runtime";

class PopDestinationView {
  #parentEl = document.querySelector(".carousel__container");
  #data;

  // The problem is that it is returning and going nowhere. Maybe the solution is to loop through and insertHTML for each iteration

  render(data) {
    this.#data = data;
    this.#generatePopDestinationMarkup(this.#data);
  }

  #generatePopDestinationMarkup(data) {
    console.log(data);
    data.forEach((country) => {
      let markup = `
          <a href="#${country.alphaCode}"><div id="#${country.alphaCode}" class="carousel-item destination-btn"  style="background-image: url(${country.flag});">
                      <div class="info">
                        <h4 class="country-name">${country.name}</h4>
                        <div class="stars">
                          <i class="fas fa-star"></i> 4.5
                        </div>
                      </div>
                    </div>
                    </a>
          `;
      this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

export default new PopDestinationView();
