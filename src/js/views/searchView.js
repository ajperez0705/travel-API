import MasterView from "./masterView";

class SearchView extends MasterView {
  _parentEl = document.querySelector(".search-container");
  _cardContainer = document.querySelector(".search-card-container");
  _searchField = document.querySelector(".search-field");
  _errorMessage = "Search for a destination";

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._parentEl.querySelector(".search-field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search-field").value = "";
  }

  render(data, searchResults) {
    this._data = data;
    console.log(data.length * 12);
    const results = this._genResultsMarkup(searchResults);
    this._searchField.insertAdjacentHTML("afterbegin", results);
    const markup = this._genMarkup(data);
    this._cardContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _genMarkup(data) {
    return data.map(this._genMarkupPreview).join("");
  }

  _genMarkupPreview(country) {
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

  _genResultsMarkup(searchResults) {
    return `
    <div class="results">
      <div class="result-content">Results Here</div>  
    </div>
    `;
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
         <p>${message}</p>
       </div>
    `;
    this.clear();
    this._cardContainer.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new SearchView();
