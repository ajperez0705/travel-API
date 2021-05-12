class SearchView {
  #parentEl = document.querySelector(".search-container");
  #cardContainer = document.querySelector(".search-card-container");
  #data;

  getQuery() {
    const query = this.#parentEl.querySelector(".search-field").value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector(".search-field").value = "";
  }

  render(data) {
    this.#data = data;
    const markup = this.#genMarkup(data);
    this.#cardContainer.insertAdjacentHTML("afterbegin", markup);
  }

  #genMarkup(data) {
    return data.map(this.#genMarkupPreview).join("");
  }

  #genMarkupPreview(country) {
    return `
      <a href="#${country.alphaCode}"><div id=#${country.alphaCode} class="search-card destination-btn"
    style="
    background-image: url(${country.flag});
    "
    >
                <div class="save-search-btn-container">
                  <span class="save-search"><i  id = heart class="far fa-heart" aria-hidden="true" ></i>
                </div>
                <div class="search-content-container ">
                    <div class="search-content">
                      <h6>${country.capital}</h6>
                      <h3 class="country-name">${country.name}</h3>
                    </div>
                </div>
            </div> 
        </a>
            `;
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
